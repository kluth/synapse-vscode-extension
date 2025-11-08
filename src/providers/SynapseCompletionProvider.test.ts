import * as vscode from 'vscode';
import {
  SynapseCompletionProvider,
  createCompletionItem,
  getCompletionItems,
} from './SynapseCompletionProvider';

describe('SynapseCompletionProvider', () => {
  let provider: SynapseCompletionProvider;
  let mockDocument: vscode.TextDocument;
  let mockPosition: vscode.Position;

  beforeEach(() => {
    provider = new SynapseCompletionProvider();
    mockDocument = {
      getText: jest.fn(() => ''),
      lineAt: jest.fn(() => ({
        text: '',
        firstNonWhitespaceCharacterIndex: 0,
      })),
      uri: { fsPath: '/test/file.ts' } as vscode.Uri,
    } as unknown as vscode.TextDocument;
    mockPosition = new vscode.Position(0, 0);
  });

  describe('provideCompletionItems()', () => {
    it('should return completion items array', () => {
      const result = provider.provideCompletionItems(mockDocument, mockPosition);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should include Neuron class completion', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const neuronItem = items.find((item) => item.label === 'Neuron');
      expect(neuronItem).toBeDefined();
    });

    it('should include Circuit class completion', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const circuitItem = items.find((item) => item.label === 'Circuit');
      expect(circuitItem).toBeDefined();
    });

    it('should include process method completion', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const processItem = items.find((item) => item.label === 'process');
      expect(processItem).toBeDefined();
    });

    it('should include async/await in method completions', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const processItem = items.find((item) => item.label === 'process');
      expect(processItem?.insertText).toContain('async');
    });

    it('should set correct completion kind for classes', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const neuronItem = items.find((item) => item.label === 'Neuron');
      expect(neuronItem?.kind).toBe(vscode.CompletionItemKind.Class);
    });

    it('should set correct completion kind for methods', () => {
      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const processItem = items.find((item) => item.label === 'process');
      expect(processItem?.kind).toBe(vscode.CompletionItemKind.Method);
    });
  });

  describe('createCompletionItem()', () => {
    it('should create a completion item with label', () => {
      const item = createCompletionItem('test', vscode.CompletionItemKind.Method);
      expect(item.label).toBe('test');
    });

    it('should create a completion item with kind', () => {
      const item = createCompletionItem('test', vscode.CompletionItemKind.Class);
      expect(item.kind).toBe(vscode.CompletionItemKind.Class);
    });

    it('should accept optional insertText', () => {
      const item = createCompletionItem('test', vscode.CompletionItemKind.Method, 'inserted');
      expect(item.insertText).toBe('inserted');
    });

    it('should accept optional documentation', () => {
      const item = createCompletionItem(
        'test',
        vscode.CompletionItemKind.Method,
        undefined,
        'docs'
      );
      expect(item.documentation).toBe('docs');
    });

    it('should use label as insertText if not provided', () => {
      const item = createCompletionItem('test', vscode.CompletionItemKind.Method);
      expect(item.insertText).toBe('test');
    });
  });

  describe('getCompletionItems()', () => {
    it('should return array of completion items', () => {
      const items = getCompletionItems();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });

    it('should include core Synapse classes', () => {
      const items = getCompletionItems();
      const labels = items.map((item) => item.label);
      expect(labels).toContain('Neuron');
      expect(labels).toContain('Circuit');
    });

    it('should include lifecycle methods', () => {
      const items = getCompletionItems();
      const labels = items.map((item) => item.label);
      expect(labels).toContain('initialize');
      expect(labels).toContain('cleanup');
    });

    it('should include event emitter methods', () => {
      const items = getCompletionItems();
      const labels = items.map((item) => item.label);
      expect(labels).toContain('on');
      expect(labels).toContain('emit');
    });

    it('should have documentation for all items', () => {
      const items = getCompletionItems();
      items.forEach((item) => {
        expect(item.documentation).toBeDefined();
        expect(typeof item.documentation).toBe('string');
        expect((item.documentation as string).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Context-aware completions', () => {
    it('should provide import completions when typing import', () => {
      (mockDocument.lineAt as jest.Mock).mockReturnValue({
        text: "import { ",
        firstNonWhitespaceCharacterIndex: 0,
      });

      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      expect(items.length).toBeGreaterThan(0);
    });

    it('should prioritize Neuron methods in Neuron class context', () => {
      (mockDocument.getText as jest.Mock).mockReturnValue(
        'class MyNeuron extends Neuron {\n  async '
      );

      const items = provider.provideCompletionItems(mockDocument, mockPosition);
      const processItem = items.find((item) => item.label === 'process');
      expect(processItem).toBeDefined();
    });
  });
});
