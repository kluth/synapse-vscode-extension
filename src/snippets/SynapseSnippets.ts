/**
 * Synapse Framework Code Snippets
 * Provides reusable code templates for common Synapse patterns
 */

export interface SnippetDefinition {
  prefix: string;
  body: string[];
  description: string;
  scope?: string; // Language scope (e.g., 'typescript', 'javascript')
  category?: string; // Category for organization
}

/**
 * Get all Synapse code snippets
 * @returns Array of snippet definitions
 */
export function getSynapseSnippets(): SnippetDefinition[] {
  return [
    {
      prefix: 'neuron',
      body: [
        "import { Neuron } from '@synapse/core';",
        '',
        '/**',
        ' * ${1:MyNeuron} - ${2:Brief description of neuron functionality}',
        ' */',
        'export class ${1:MyNeuron} extends Neuron {',
        '  constructor() {',
        '    super();',
        '  }',
        '',
        '  /**',
        '   * Process incoming data',
        '   * @param input - Input data to process',
        '   * @returns Processed output',
        '   */',
        '  async process(input: ${3:any}): Promise<${4:any}> {',
        '    // TODO: Implement neuron processing logic',
        '    ${5:return input;}',
        '  }',
        '}',
      ],
      description: 'Create a new Neuron class with JSDoc comments',
      scope: 'typescript',
      category: 'core',
    },
    {
      prefix: 'neuron-lifecycle',
      body: [
        "import { Neuron } from '@synapse/core';",
        '',
        'export class ${1:MyNeuron} extends Neuron {',
        '  constructor() {',
        '    super();',
        '  }',
        '',
        '  async initialize(): Promise<void> {',
        '    await super.initialize();',
        '    // TODO: Add initialization logic',
        '  }',
        '',
        '  async process(input: ${2:any}): Promise<${3:any}> {',
        '    // TODO: Implement processing logic',
        '    ${4:return input;}',
        '  }',
        '',
        '  async cleanup(): Promise<void> {',
        '    // TODO: Add cleanup logic',
        '    await super.cleanup();',
        '  }',
        '}',
      ],
      description: 'Create a Neuron with lifecycle methods (initialize, process, cleanup)',
      scope: 'typescript',
      category: 'core',
    },
    {
      prefix: 'circuit',
      body: [
        "import { Circuit } from '@synapse/core';",
        "import { ${2:MyNeuron} } from './${3:MyNeuron}';",
        '',
        '/**',
        ' * ${1:MyCircuit} - ${4:Brief description of circuit functionality}',
        ' */',
        'export class ${1:MyCircuit} extends Circuit {',
        '  constructor() {',
        '    super();',
        '    this.addNeuron(new ${2:MyNeuron}());',
        '  }',
        '',
        '  /**',
        '   * Execute circuit logic',
        '   * @param input - Input data',
        '   * @returns Circuit output',
        '   */',
        '  async execute(input: ${5:any}): Promise<${6:any}> {',
        '    try {',
        '      // TODO: Implement circuit execution logic',
        '      ${7:return this.process(input);}',
        '    } catch (error) {',
        "      console.error('Circuit execution error:', error);",
        '      throw error;',
        '    }',
        '  }',
        '}',
      ],
      description: 'Create a new Circuit composition with error handling',
      scope: 'typescript',
      category: 'core',
    },
    {
      prefix: 'handler',
      body: [
        '/**',
        ' * Handle ${1:event} messages',
        ' * @param message - Message to handle',
        ' */',
        'async handle${1:Event}(message: ${2:MessageType}): Promise<void> {',
        '  try {',
        '    // TODO: Implement message handling logic',
        '    ${3:console.log(message);}',
        '  } catch (error) {',
        '    console.error(`Error handling ${1:event}:`, error);',
        '    throw error;',
        '  }',
        '}',
      ],
      description: 'Create a message handler method with documentation',
      scope: 'typescript',
      category: 'messaging',
    },
    {
      prefix: 'listener',
      body: [
        "this.on('${1:event}', async (data: ${2:any}) => {",
        '  try {',
        '    // TODO: Implement event listener logic',
        '    ${3:console.log(data);}',
        '  } catch (error) {',
        "    console.error('Error in ${1:event} listener:', error);",
        '  }',
        '});',
      ],
      description: 'Create an event listener with error handling',
      scope: 'typescript',
      category: 'messaging',
    },
    {
      prefix: 'synapse-test',
      body: [
        "import { ${1:MyNeuron} } from './${2:MyNeuron}';",
        '',
        "describe('${1:MyNeuron}', () => {",
        '  let neuron: ${1:MyNeuron};',
        '',
        "  beforeEach(() => {",
        '    neuron = new ${1:MyNeuron}();',
        '  });',
        '',
        "  describe('process()', () => {",
        "    it('should process input correctly', async () => {",
        '      const input = ${3:{}};',
        '      const result = await neuron.process(input);',
        '      ${4:expect(result).toBeDefined();}',
        '    });',
        '  });',
        '});',
      ],
      description: 'Create a Jest test suite for a Neuron',
      scope: 'typescript',
      category: 'testing',
    },
    {
      prefix: 'synapse-interface',
      body: [
        '/**',
        ' * ${1:MessageType} interface',
        ' */',
        'export interface ${1:MessageType} {',
        '  id: string;',
        '  timestamp: Date;',
        '  data: ${2:any};',
        '  ${3:// Add additional fields}',
        '}',
      ],
      description: 'Create a message type interface',
      scope: 'typescript',
      category: 'types',
    },
  ];
}

/**
 * Validate a snippet definition
 * @param snippet - Snippet to validate
 * @returns true if valid, false otherwise
 */
export function validateSnippet(snippet: SnippetDefinition): boolean {
  if (!snippet) {
    return false;
  }

  if (!snippet.prefix || typeof snippet.prefix !== 'string') {
    return false;
  }

  if (!snippet.body || !Array.isArray(snippet.body)) {
    return false;
  }

  if (snippet.body.length === 0) {
    return false;
  }

  if (!snippet.description || typeof snippet.description !== 'string') {
    return false;
  }

  return true;
}
