import * as vscode from 'vscode';
import { SynapseHoverProvider, getHoverInfo } from './SynapseHoverProvider';

describe('SynapseHoverProvider', () => {
  let provider: SynapseHoverProvider;
  let mockDocument: vscode.TextDocument;
  let mockPosition: vscode.Position;

  beforeEach(() => {
    provider = new SynapseHoverProvider();
    mockDocument = {
      getText: jest.fn(() => ''),
      lineAt: jest.fn(() => ({
        text: '',
        firstNonWhitespaceCharacterIndex: 0,
      })),
      getWordRangeAtPosition: jest.fn(),
      uri: { fsPath: '/test/file.ts' } as vscode.Uri,
    } as unknown as vscode.TextDocument;
    mockPosition = new vscode.Position(0, 0);
  });

  describe('provideHover()', () => {
    it('should return null when word is not found', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(undefined);
      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result).toBeNull();
    });

    it('should return hover for Neuron class', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 6))
      );
      (mockDocument.getText as jest.Mock).mockReturnValue('Neuron');

      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result).toBeDefined();
      expect(result?.contents).toBeDefined();
    });

    it('should return hover for Circuit class', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 7))
      );
      (mockDocument.getText as jest.Mock).mockReturnValue('Circuit');

      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result).toBeDefined();
      expect(result?.contents).toBeDefined();
    });

    it('should return hover for process method', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 7))
      );
      (mockDocument.getText as jest.Mock).mockReturnValue('process');

      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result).toBeDefined();
      expect(result?.contents).toBeDefined();
    });

    it('should return null for unknown words', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 7))
      );
      (mockDocument.getText as jest.Mock).mockReturnValue('unknownWord');

      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result).toBeNull();
    });

    it('should include markdown in hover content', () => {
      (mockDocument.getWordRangeAtPosition as jest.Mock).mockReturnValue(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 6))
      );
      (mockDocument.getText as jest.Mock).mockReturnValue('Neuron');

      const result = provider.provideHover(mockDocument, mockPosition);
      expect(result?.contents.length).toBeGreaterThan(0);
    });
  });

  describe('getHoverInfo()', () => {
    it('should return hover info for Neuron', () => {
      const info = getHoverInfo('Neuron');
      expect(info).toBeDefined();
      expect(info?.title).toBe('Neuron');
    });

    it('should return hover info for Circuit', () => {
      const info = getHoverInfo('Circuit');
      expect(info).toBeDefined();
      expect(info?.title).toBe('Circuit');
    });

    it('should return hover info for process method', () => {
      const info = getHoverInfo('process');
      expect(info).toBeDefined();
      expect(info?.title).toBe('process');
    });

    it('should return hover info for initialize method', () => {
      const info = getHoverInfo('initialize');
      expect(info).toBeDefined();
      expect(info?.title).toBe('initialize');
    });

    it('should return hover info for cleanup method', () => {
      const info = getHoverInfo('cleanup');
      expect(info).toBeDefined();
      expect(info?.title).toBe('cleanup');
    });

    it('should return null for unknown words', () => {
      const info = getHoverInfo('unknownWord');
      expect(info).toBeNull();
    });

    it('should include description for all items', () => {
      const items = ['Neuron', 'Circuit', 'process', 'initialize', 'cleanup', 'on', 'emit'];
      items.forEach((item) => {
        const info = getHoverInfo(item);
        expect(info).toBeDefined();
        expect(info?.description).toBeDefined();
        expect(info?.description.length).toBeGreaterThan(0);
      });
    });

    it('should include examples for core classes', () => {
      const info = getHoverInfo('Neuron');
      expect(info).toBeDefined();
      expect(info?.example).toBeDefined();
      expect(info?.example?.length).toBeGreaterThan(0);
    });

    it('should include signature for methods', () => {
      const info = getHoverInfo('process');
      expect(info).toBeDefined();
      expect(info?.signature).toBeDefined();
      expect(info?.signature).toContain('async');
    });
  });
});
