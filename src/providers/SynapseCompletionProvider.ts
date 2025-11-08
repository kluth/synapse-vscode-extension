import * as vscode from 'vscode';

/**
 * Create a completion item
 * @param label - Label for the completion
 * @param kind - Kind of completion
 * @param insertText - Text to insert (defaults to label)
 * @param documentation - Documentation for the completion
 * @returns Completion item
 */
export function createCompletionItem(
  label: string,
  kind: vscode.CompletionItemKind,
  insertText?: string,
  documentation?: string
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(label, kind);
  item.insertText = insertText || label;
  item.documentation = documentation || '';
  return item;
}

/**
 * Get all Synapse completion items
 * @returns Array of completion items
 */
export function getCompletionItems(): vscode.CompletionItem[] {
  return [
    // Core Classes
    createCompletionItem(
      'Neuron',
      vscode.CompletionItemKind.Class,
      'Neuron',
      'Base class for creating neurons - individual processing units in Synapse'
    ),
    createCompletionItem(
      'Circuit',
      vscode.CompletionItemKind.Class,
      'Circuit',
      'Container for composing multiple neurons into a processing pipeline'
    ),

    // Neuron Lifecycle Methods
    createCompletionItem(
      'process',
      vscode.CompletionItemKind.Method,
      'async process(input: any): Promise<any> {\n  $0\n}',
      'Main processing method for transforming input data'
    ),
    createCompletionItem(
      'initialize',
      vscode.CompletionItemKind.Method,
      'async initialize(): Promise<void> {\n  await super.initialize();\n  $0\n}',
      'Called when neuron is initialized - setup resources here'
    ),
    createCompletionItem(
      'cleanup',
      vscode.CompletionItemKind.Method,
      'async cleanup(): Promise<void> {\n  $0\n  await super.cleanup();\n}',
      'Called when neuron is destroyed - cleanup resources here'
    ),

    // Event Emitter Methods
    createCompletionItem(
      'on',
      vscode.CompletionItemKind.Method,
      "on('${1:event}', (data: ${2:any}) => {\n  $0\n})",
      'Register an event listener'
    ),
    createCompletionItem(
      'emit',
      vscode.CompletionItemKind.Method,
      "emit('${1:event}', ${2:data})",
      'Emit an event to all registered listeners'
    ),
    createCompletionItem(
      'off',
      vscode.CompletionItemKind.Method,
      "off('${1:event}', ${2:handler})",
      'Remove an event listener'
    ),

    // Circuit Methods
    createCompletionItem(
      'addNeuron',
      vscode.CompletionItemKind.Method,
      'addNeuron(${1:neuron})',
      'Add a neuron to the circuit'
    ),
    createCompletionItem(
      'execute',
      vscode.CompletionItemKind.Method,
      'async execute(input: any): Promise<any> {\n  $0\n}',
      'Execute the circuit with input data'
    ),
  ];
}

/**
 * Synapse Completion Provider
 * Provides IntelliSense for Synapse Framework APIs
 */
export class SynapseCompletionProvider implements vscode.CompletionItemProvider {
  /**
   * Provide completion items for the given position
   * @param document - Text document
   * @param position - Position in document
   * @returns Array of completion items
   */
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const line = document.lineAt(position.line);
    const lineText = line.text.substring(0, position.character);

    // Check if we're in an import context
    if (lineText.includes('import')) {
      return this.getImportCompletions();
    }

    // Check if we're in a Neuron class
    const documentText = document.getText();
    if (documentText.includes('extends Neuron')) {
      return this.getNeuronContextCompletions();
    }

    // Check if we're in a Circuit class
    if (documentText.includes('extends Circuit')) {
      return this.getCircuitContextCompletions();
    }

    // Default: return all completions
    return getCompletionItems();
  }

  /**
   * Get completions for import statements
   * @returns Import-specific completions
   */
  private getImportCompletions(): vscode.CompletionItem[] {
    return [
      createCompletionItem(
        'Neuron',
        vscode.CompletionItemKind.Class,
        'Neuron',
        'Import Neuron class from @synapse/core'
      ),
      createCompletionItem(
        'Circuit',
        vscode.CompletionItemKind.Class,
        'Circuit',
        'Import Circuit class from @synapse/core'
      ),
    ];
  }

  /**
   * Get label as string from completion item
   * @param item - Completion item
   * @returns Label as string
   */
  private getLabelAsString(item: vscode.CompletionItem): string {
    return typeof item.label === 'string' ? item.label : item.label.label;
  }

  /**
   * Get completions for Neuron class context
   * @returns Neuron-specific completions
   */
  private getNeuronContextCompletions(): vscode.CompletionItem[] {
    const items = getCompletionItems();
    // Filter to show only Neuron-relevant items
    return items.filter((item) =>
      ['process', 'initialize', 'cleanup', 'on', 'emit', 'off'].includes(
        this.getLabelAsString(item)
      )
    );
  }

  /**
   * Get completions for Circuit class context
   * @returns Circuit-specific completions
   */
  private getCircuitContextCompletions(): vscode.CompletionItem[] {
    const items = getCompletionItems();
    // Filter to show only Circuit-relevant items
    return items.filter((item) =>
      ['addNeuron', 'execute', 'process', 'on', 'emit', 'off'].includes(
        this.getLabelAsString(item)
      )
    );
  }
}
