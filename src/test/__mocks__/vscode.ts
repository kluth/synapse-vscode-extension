/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Mock vscode module for unit tests
 */

export enum ExtensionMode {
  Production = 1,
  Development = 2,
  Test = 3,
}

export class Uri {
  static file(path: string): Uri {
    return new Uri(path);
  }

  constructor(public fsPath: string) {}
}

export const window = {
  createOutputChannel: jest.fn(() => ({
    appendLine: jest.fn(),
    dispose: jest.fn(),
  })),
  showInformationMessage: jest.fn(() => Promise.resolve()),
  showErrorMessage: jest.fn(() => Promise.resolve()),
  showWarningMessage: jest.fn(() => Promise.resolve()),
};

export const commands = {
  registerCommand: jest.fn((_command: string, _callback: (...args: any[]) => any) => ({
    dispose: jest.fn(),
  })),
  executeCommand: jest.fn(),
};

export const workspace = {
  createFileSystemWatcher: jest.fn(() => ({
    onDidChange: jest.fn(),
    onDidCreate: jest.fn(),
    onDidDelete: jest.fn(),
    dispose: jest.fn(),
  })),
  workspaceFolders: [],
};

export class FileSystemWatcher {
  onDidChange = jest.fn();
  onDidCreate = jest.fn();
  onDidDelete = jest.fn();
  dispose = jest.fn();
}
