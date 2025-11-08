/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as vscode from 'vscode';
import { activate, deactivate } from './extension';

describe('Extension Activation', () => {
  let mockContext: vscode.ExtensionContext;

  beforeEach(() => {
    // Mock ExtensionContext
    mockContext = {
      subscriptions: [],
      workspaceState: {} as any,
      globalState: {} as any,
      extensionPath: '',
      asAbsolutePath: jest.fn(),
      storagePath: '',
      globalStoragePath: '',
      logPath: '',
      extensionUri: {} as any,
      environmentVariableCollection: {} as any,
      extensionMode: vscode.ExtensionMode.Test,
      storageUri: undefined,
      globalStorageUri: {} as any,
      logUri: {} as any,
      secrets: {} as any,
      extension: {} as any,
      languageModelAccessInformation: {} as any,
    };
  });

  describe('activate()', () => {
    it('should be defined', () => {
      expect(activate).toBeDefined();
    });

    it('should accept ExtensionContext parameter', () => {
      expect(() => activate(mockContext)).not.toThrow();
    });

    it('should register at least one subscription', () => {
      activate(mockContext);
      expect(mockContext.subscriptions.length).toBeGreaterThan(0);
    });
  });

  describe('deactivate()', () => {
    it('should be defined', () => {
      expect(deactivate).toBeDefined();
    });

    it('should not throw when called', () => {
      expect(() => deactivate()).not.toThrow();
    });
  });
});
