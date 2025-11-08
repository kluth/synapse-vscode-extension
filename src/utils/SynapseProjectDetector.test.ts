import * as vscode from 'vscode';
import { SynapseProjectDetector } from './SynapseProjectDetector';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('SynapseProjectDetector', () => {
  let detector: SynapseProjectDetector;
  const mockWorkspaceUri = vscode.Uri.file('/test/workspace');

  beforeEach(() => {
    detector = new SynapseProjectDetector();
    jest.clearAllMocks();
  });

  describe('isSynapseProject()', () => {
    it('should return true when package.json has @synapse dependencies', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const result = await detector.isSynapseProject(mockWorkspaceUri);
      expect(result).toBe(true);
    });

    it('should return true when package.json has @synapse devDependencies', async () => {
      const mockPackageJson = {
        devDependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const result = await detector.isSynapseProject(mockWorkspaceUri);
      expect(result).toBe(true);
    });

    it('should return false when package.json does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('ENOENT: no such file'));

      const result = await detector.isSynapseProject(mockWorkspaceUri);
      expect(result).toBe(false);
    });

    it('should return false when package.json has no @synapse dependencies', async () => {
      const mockPackageJson = {
        dependencies: {
          express: '^4.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const result = await detector.isSynapseProject(mockWorkspaceUri);
      expect(result).toBe(false);
    });

    it('should return false when package.json is invalid JSON', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid json{');

      const result = await detector.isSynapseProject(mockWorkspaceUri);
      expect(result).toBe(false);
    });
  });

  describe('getSynapseVersion()', () => {
    it('should return version when @synapse/core is in dependencies', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.2.3',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const version = await detector.getSynapseVersion(mockWorkspaceUri);
      expect(version).toBe('^1.2.3');
    });

    it('should return version when @synapse/core is in devDependencies', async () => {
      const mockPackageJson = {
        devDependencies: {
          '@synapse/core': '~2.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const version = await detector.getSynapseVersion(mockWorkspaceUri);
      expect(version).toBe('~2.0.0');
    });

    it('should return null when @synapse/core is not found', async () => {
      const mockPackageJson = {
        dependencies: {},
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const version = await detector.getSynapseVersion(mockWorkspaceUri);
      expect(version).toBeNull();
    });

    it('should return null when package.json does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('ENOENT'));

      const version = await detector.getSynapseVersion(mockWorkspaceUri);
      expect(version).toBeNull();
    });
  });

  describe('getAllSynapseDependencies()', () => {
    it('should return all @synapse/* dependencies', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
          '@synapse/neuron': '^1.0.0',
          'express': '^4.0.0',
        },
        devDependencies: {
          '@synapse/testing': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const deps = await detector.getAllSynapseDependencies(mockWorkspaceUri);
      expect(deps).toEqual({
        '@synapse/core': '^1.0.0',
        '@synapse/neuron': '^1.0.0',
        '@synapse/testing': '^1.0.0',
      });
    });

    it('should return empty object when no @synapse dependencies', async () => {
      const mockPackageJson = {
        dependencies: {
          'express': '^4.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const deps = await detector.getAllSynapseDependencies(mockWorkspaceUri);
      expect(deps).toEqual({});
    });
  });

  describe('validateStructure()', () => {
    it('should return valid for a correct Synapse project structure', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
      (fs.access as jest.Mock).mockResolvedValue(undefined); // All files exist

      const result = await detector.validateStructure(mockWorkspaceUri);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return error when src/ directory is missing', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
      (fs.access as jest.Mock).mockRejectedValue(new Error('ENOENT'));

      const result = await detector.validateStructure(mockWorkspaceUri);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('src/');
      expect(result.errors[0]).toContain('mkdir src');
    });

    it('should return error when tsconfig.json is missing', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
      (fs.access as jest.Mock).mockImplementation((path: string) => {
        if (path.includes('tsconfig.json')) {
          return Promise.reject(new Error('ENOENT'));
        }
        return Promise.resolve();
      });

      const result = await detector.validateStructure(mockWorkspaceUri);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((err) => err.includes('tsconfig.json'))).toBe(true);
      expect(result.errors.some((err) => err.includes('npx tsc --init'))).toBe(true);
    });

    it('should return multiple errors when multiple issues exist', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
      (fs.access as jest.Mock).mockRejectedValue(new Error('ENOENT')); // Nothing exists

      const result = await detector.validateStructure(mockWorkspaceUri);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    it('should suggest creating neurons/ or circuits/ directory', async () => {
      const mockPackageJson = {
        dependencies: {
          '@synapse/core': '^1.0.0',
        },
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));
      (fs.access as jest.Mock).mockImplementation((path: string) => {
        if (path.includes('neurons') || path.includes('circuits')) {
          return Promise.reject(new Error('ENOENT'));
        }
        return Promise.resolve();
      });

      const result = await detector.validateStructure(mockWorkspaceUri);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some((w) => w.includes('neurons') && w.includes('circuits'))).toBe(
        true
      );
      expect(result.warnings.some((w) => w.includes('best practices'))).toBe(true);
    });
  });
});
