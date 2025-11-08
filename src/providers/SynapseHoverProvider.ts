import * as vscode from 'vscode';

/**
 * Hover information for Synapse symbols
 */
export interface HoverInfo {
  title: string;
  description: string;
  signature?: string;
  example?: string;
  returns?: string;
  params?: Array<{ name: string; type: string; description: string }>;
  notes?: string[];
  seeAlso?: string[];
}

/**
 * Get hover information for a given word
 * @param word - Word to get hover info for
 * @returns Hover information or null
 */
export function getHoverInfo(word: string): HoverInfo | null {
  const hoverData: Record<string, HoverInfo> = {
    Neuron: {
      title: 'Neuron',
      description:
        'Base class for creating neurons - individual processing units in the Synapse Framework. ' +
        'Neurons are the fundamental building blocks that process data asynchronously.',
      signature: 'class Neuron',
      example: `import { Neuron } from '@synapse/core';

class MyNeuron extends Neuron {
  async process(input: any): Promise<any> {
    // Transform input data
    return processedData;
  }
}`,
    },
    Circuit: {
      title: 'Circuit',
      description:
        'Container class for composing multiple neurons into a processing pipeline. ' +
        'Circuits orchestrate complex workflows by connecting neurons together.',
      signature: 'class Circuit',
      example: `import { Circuit } from '@synapse/core';

class MyCircuit extends Circuit {
  constructor() {
    super();
    this.addNeuron(new ProcessingNeuron());
    this.addNeuron(new ValidationNeuron());
  }
}`,
    },
    process: {
      title: 'process',
      description:
        'Main processing method for transforming input data. ' +
        'This async method is called to handle data processing in neurons.',
      signature: 'async process(input: any): Promise<any>',
      params: [
        {
          name: 'input',
          type: 'any',
          description: 'Input data to be processed by the neuron',
        },
      ],
      returns: 'Promise<any> - Processed output data',
      notes: [
        'Override this method to implement custom processing logic',
        'Always return a Promise for async processing',
        'Handle errors appropriately within this method',
      ],
    },
    initialize: {
      title: 'initialize',
      description:
        'Lifecycle method called when neuron is initialized. ' +
        'Use this to set up resources, connections, or initial state.',
      signature: 'async initialize(): Promise<void>',
      returns: 'Promise<void>',
      notes: [
        'Call super.initialize() first when overriding',
        'Initialize database connections, file handles, etc.',
        'Runs only once during neuron creation',
      ],
      seeAlso: ['cleanup', 'process'],
    },
    cleanup: {
      title: 'cleanup',
      description:
        'Lifecycle method called when neuron is destroyed. ' +
        'Use this to release resources, close connections, or perform cleanup.',
      signature: 'async cleanup(): Promise<void>',
      returns: 'Promise<void>',
      notes: [
        'Call super.cleanup() last when overriding',
        'Close database connections, file handles, etc.',
        'Runs when neuron is being destroyed or removed',
      ],
      seeAlso: ['initialize'],
    },
    on: {
      title: 'on',
      description:
        'Register an event listener. ' +
        'Allows neurons to respond to events emitted by other neurons or circuits.',
      signature: "on(event: string, handler: (data: any) => void): void",
    },
    emit: {
      title: 'emit',
      description:
        'Emit an event to all registered listeners. ' +
        'Used for inter-neuron communication and event-driven workflows.',
      signature: 'emit(event: string, data?: any): void',
    },
    addNeuron: {
      title: 'addNeuron',
      description:
        'Add a neuron to the circuit. ' +
        'Neurons are executed in the order they are added.',
      signature: 'addNeuron(neuron: Neuron): void',
    },
    execute: {
      title: 'execute',
      description:
        'Execute the circuit with input data. ' +
        'Processes data through all neurons in the circuit.',
      signature: 'async execute(input: any): Promise<any>',
    },
  };

  return hoverData[word] || null;
}

/**
 * Synapse Hover Provider
 * Provides documentation on hover for Synapse Framework symbols
 */
export class SynapseHoverProvider implements vscode.HoverProvider {
  /**
   * Provide hover information for a position in the document
   * @param document - Text document
   * @param position - Position in document
   * @returns Hover or null
   */
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | null {
    const range = document.getWordRangeAtPosition(position);
    if (!range) {
      return null;
    }

    const word = document.getText(range);
    const hoverInfo = getHoverInfo(word);

    if (!hoverInfo) {
      return null;
    }

    const markdown = new vscode.MarkdownString();
    markdown.isTrusted = true;
    markdown.supportThemeIcons = true;

    // Add title
    markdown.appendMarkdown(`### $(symbol-class) ${hoverInfo.title}\n\n`);

    // Add signature if available
    if (hoverInfo.signature) {
      markdown.appendMarkdown(`**Signature:** \`${hoverInfo.signature}\`\n\n`);
    }

    // Add description
    markdown.appendMarkdown(`${hoverInfo.description}\n\n`);

    // Add parameters if available
    if (hoverInfo.params && hoverInfo.params.length > 0) {
      markdown.appendMarkdown(`**Parameters:**\n`);
      hoverInfo.params.forEach((param) => {
        markdown.appendMarkdown(
          `- \`${param.name}\` (${param.type}): ${param.description}\n`
        );
      });
      markdown.appendMarkdown(`\n`);
    }

    // Add return value if available
    if (hoverInfo.returns) {
      markdown.appendMarkdown(`**Returns:** ${hoverInfo.returns}\n\n`);
    }

    // Add notes if available
    if (hoverInfo.notes && hoverInfo.notes.length > 0) {
      markdown.appendMarkdown(`**$(info) Notes:**\n`);
      hoverInfo.notes.forEach((note) => {
        markdown.appendMarkdown(`- ${note}\n`);
      });
      markdown.appendMarkdown(`\n`);
    }

    // Add see also if available
    if (hoverInfo.seeAlso && hoverInfo.seeAlso.length > 0) {
      markdown.appendMarkdown(`**See also:** ${hoverInfo.seeAlso.join(', ')}\n\n`);
    }

    // Add example if available
    if (hoverInfo.example) {
      markdown.appendMarkdown(`**$(code) Example:**\n`);
      markdown.appendCodeblock(hoverInfo.example, 'typescript');
    }

    return new vscode.Hover(markdown, range);
  }
}
