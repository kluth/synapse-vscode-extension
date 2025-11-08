import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

interface CachedResult {
  isSynapseProject: boolean;
  version: string | null;
  dependencies: Record<string, string>;
  timestamp: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Detects and validates Synapse projects in the workspace
 * Implements caching and file watching for performance
 */
export class SynapseProjectDetector {
  private cache: Map<string, CachedResult> = new Map();
  private fileWatcher: vscode.FileSystemWatcher | undefined;
  private readonly CACHE_TTL = 60000; // 60 seconds

  constructor() {
    this.setupFileWatcher();
  }

  /**
   * Set up file watcher for package.json changes
   */
  private setupFileWatcher(): void {
    // Watch for package.json changes in workspace
    this.fileWatcher = vscode.workspace.createFileSystemWatcher('**/package.json');

    this.fileWatcher.onDidChange((uri) => {
      this.invalidateCache(uri);
    });

    this.fileWatcher.onDidCreate((uri) => {
      this.invalidateCache(uri);
    });

    this.fileWatcher.onDidDelete((uri) => {
      this.invalidateCache(uri);
    });
  }

  /**
   * Invalidate cache for a specific workspace
   */
  private invalidateCache(packageJsonUri: vscode.Uri): void {
    const workspaceUri = vscode.Uri.file(path.dirname(packageJsonUri.fsPath));
    const cacheKey = workspaceUri.fsPath;
    this.cache.delete(cacheKey);
  }

  /**
   * Get cached result if valid
   */
  private getCachedResult(workspaceUri: vscode.Uri): CachedResult | null {
    const cacheKey = workspaceUri.fsPath;
    const cached = this.cache.get(cacheKey);

    if (!cached) {
      return null;
    }

    const now = Date.now();
    if (now - cached.timestamp > this.CACHE_TTL) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached;
  }

  /**
   * Set cached result
   */
  private setCachedResult(
    workspaceUri: vscode.Uri,
    isSynapseProject: boolean,
    version: string | null,
    dependencies: Record<string, string>
  ): void {
    const cacheKey = workspaceUri.fsPath;
    this.cache.set(cacheKey, {
      isSynapseProject,
      version,
      dependencies,
      timestamp: Date.now(),
    });
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.fileWatcher?.dispose();
    this.cache.clear();
  }
  /**
   * Check if a workspace folder contains a Synapse project
   * @param workspaceUri - URI of the workspace folder
   * @returns true if the workspace contains a Synapse project
   */
  async isSynapseProject(workspaceUri: vscode.Uri): Promise<boolean> {
    // Check cache first
    const cached = this.getCachedResult(workspaceUri);
    if (cached) {
      return cached.isSynapseProject;
    }

    // Read and analyze package.json
    const result = await this.analyzePackageJson(workspaceUri);
    return result.isSynapseProject;
  }

  /**
   * Get the version of @synapse/core if it exists
   * @param workspaceUri - URI of the workspace folder
   * @returns version string or null if not found
   */
  async getSynapseVersion(workspaceUri: vscode.Uri): Promise<string | null> {
    // Check cache first
    const cached = this.getCachedResult(workspaceUri);
    if (cached) {
      return cached.version;
    }

    // Read and analyze package.json
    const result = await this.analyzePackageJson(workspaceUri);
    return result.version;
  }

  /**
   * Get all @synapse/* dependencies from package.json
   * @param workspaceUri - URI of the workspace folder
   * @returns object with all @synapse dependencies and their versions
   */
  async getAllSynapseDependencies(
    workspaceUri: vscode.Uri
  ): Promise<Record<string, string>> {
    // Check cache first
    const cached = this.getCachedResult(workspaceUri);
    if (cached) {
      return cached.dependencies;
    }

    // Read and analyze package.json
    const result = await this.analyzePackageJson(workspaceUri);
    return result.dependencies;
  }

  /**
   * Analyze package.json and cache the result
   * @param workspaceUri - URI of the workspace folder
   * @returns analysis result
   */
  private async analyzePackageJson(workspaceUri: vscode.Uri): Promise<CachedResult> {
    try {
      const packageJsonPath = path.join(workspaceUri.fsPath, 'package.json');
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
      const packageJson: {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      } = JSON.parse(packageJsonContent) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };

      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};
      const allDeps: Record<string, string> = { ...dependencies, ...devDependencies };

      // Filter @synapse/* packages
      const synapseDeps: Record<string, string> = {};
      for (const [dep, version] of Object.entries(allDeps)) {
        if (dep.startsWith('@synapse/')) {
          synapseDeps[dep] = version;
        }
      }

      const isSynapseProject = Object.keys(synapseDeps).length > 0;
      const version = (allDeps['@synapse/core'] as string | undefined) || null;

      // Cache the result
      this.setCachedResult(workspaceUri, isSynapseProject, version, synapseDeps);

      return {
        isSynapseProject,
        version,
        dependencies: synapseDeps,
        timestamp: Date.now(),
      };
    } catch (error) {
      // Cache negative result
      this.setCachedResult(workspaceUri, false, null, {});

      return {
        isSynapseProject: false,
        version: null,
        dependencies: {},
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Validate the structure of a Synapse project
   * @param workspaceUri - URI of the workspace folder
   * @returns validation result with errors and warnings
   */
  async validateStructure(workspaceUri: vscode.Uri): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check if it's a Synapse project first
      const isSynapse = await this.isSynapseProject(workspaceUri);
      if (!isSynapse) {
        errors.push(
          'Not a Synapse project: No @synapse/* dependencies found in package.json.\n' +
            'To use this extension, install Synapse framework dependencies:\n' +
            '  npm install @synapse/core\n' +
            'Visit https://github.com/kluth/synapse for more information.'
        );
        return { isValid: false, errors, warnings };
      }

      // Check for required directories and files
      const requiredPaths = [
        { path: 'src', type: 'directory', required: true },
        { path: 'tsconfig.json', type: 'file', required: true },
      ];

      const optionalPaths = [
        { path: 'neurons', type: 'directory', required: false },
        { path: 'circuits', type: 'directory', required: false },
      ];

      // Validate required paths
      for (const { path: pathName, type, required } of requiredPaths) {
        const fullPath = path.join(workspaceUri.fsPath, pathName);
        try {
          await fs.access(fullPath);
        } catch {
          if (required) {
            if (type === 'directory') {
              if (pathName === 'src') {
                errors.push(
                  `Missing required 'src/' directory. Synapse projects require a source directory for TypeScript code. Create it with: mkdir src`
                );
              } else {
                errors.push(`Required directory '${pathName}/' is missing. Please create it to continue.`);
              }
            } else {
              if (pathName === 'tsconfig.json') {
                errors.push(
                  `Missing 'tsconfig.json'. Synapse requires TypeScript configuration for type safety and compilation. Create one with: npx tsc --init`
                );
              } else {
                errors.push(
                  `Required file '${pathName}' is missing. Please create this file in your project root.`
                );
              }
            }
          }
        }
      }

      // Check optional paths and provide warnings
      let hasNeuronsOrCircuits = false;
      for (const { path: pathName } of optionalPaths) {
        const fullPath = path.join(workspaceUri.fsPath, pathName);
        try {
          await fs.access(fullPath);
          hasNeuronsOrCircuits = true;
        } catch {
          // Optional path doesn't exist
        }
      }

      if (!hasNeuronsOrCircuits) {
        warnings.push(
          'No neurons/ or circuits/ directories found. Consider organizing your Synapse components in dedicated directories:\n' +
            '  • neurons/ - for individual processing units (Neurons)\n' +
            '  • circuits/ - for composed Neuron workflows (Circuits)\n' +
            'This improves code organization and follows Synapse best practices.'
        );
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(
        `Validation failed unexpectedly: ${errorMessage}\n` +
          'This may indicate file system permission issues or corrupted project files.\n' +
          'Please check your workspace permissions and try again.'
      );
      return { isValid: false, errors, warnings };
    }
  }
}
