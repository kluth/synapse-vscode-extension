import { getSynapseSnippets, validateSnippet, SnippetDefinition } from './SynapseSnippets';

describe('SynapseSnippets', () => {
  describe('getSynapseSnippets()', () => {
    it('should return an array of snippet definitions', () => {
      const snippets = getSynapseSnippets();
      expect(Array.isArray(snippets)).toBe(true);
      expect(snippets.length).toBeGreaterThan(0);
    });

    it('should include Neuron class snippet', () => {
      const snippets = getSynapseSnippets();
      const neuronSnippet = snippets.find((s) => s.prefix === 'neuron');
      expect(neuronSnippet).toBeDefined();
      expect(neuronSnippet?.description).toContain('Neuron');
    });

    it('should include Circuit composition snippet', () => {
      const snippets = getSynapseSnippets();
      const circuitSnippet = snippets.find((s) => s.prefix === 'circuit');
      expect(circuitSnippet).toBeDefined();
      expect(circuitSnippet?.description).toContain('Circuit');
    });

    it('should include message handler snippet', () => {
      const snippets = getSynapseSnippets();
      const handlerSnippet = snippets.find((s) => s.prefix === 'handler');
      expect(handlerSnippet).toBeDefined();
    });

    it('should include event listener snippet', () => {
      const snippets = getSynapseSnippets();
      const listenerSnippet = snippets.find((s) => s.prefix === 'listener');
      expect(listenerSnippet).toBeDefined();
    });

    it('should have valid structure for all snippets', () => {
      const snippets = getSynapseSnippets();
      snippets.forEach((snippet) => {
        expect(snippet.prefix).toBeDefined();
        expect(snippet.body).toBeDefined();
        expect(snippet.description).toBeDefined();
        expect(Array.isArray(snippet.body)).toBe(true);
      });
    });
  });

  describe('validateSnippet()', () => {
    it('should return true for valid snippet', () => {
      const validSnippet: SnippetDefinition = {
        prefix: 'test',
        body: ['line1', 'line2'],
        description: 'Test snippet',
      };
      expect(validateSnippet(validSnippet)).toBe(true);
    });

    it('should return false when prefix is missing', () => {
      const invalidSnippet = {
        body: ['line1'],
        description: 'Test',
      } as SnippetDefinition;
      expect(validateSnippet(invalidSnippet)).toBe(false);
    });

    it('should return false when body is missing', () => {
      const invalidSnippet = {
        prefix: 'test',
        description: 'Test',
      } as SnippetDefinition;
      expect(validateSnippet(invalidSnippet)).toBe(false);
    });

    it('should return false when body is not an array', () => {
      const invalidSnippet = {
        prefix: 'test',
        body: 'not an array',
        description: 'Test',
      } as unknown as SnippetDefinition;
      expect(validateSnippet(invalidSnippet)).toBe(false);
    });

    it('should return false when description is missing', () => {
      const invalidSnippet = {
        prefix: 'test',
        body: ['line1'],
      } as SnippetDefinition;
      expect(validateSnippet(invalidSnippet)).toBe(false);
    });

    it('should return false when body is empty array', () => {
      const invalidSnippet: SnippetDefinition = {
        prefix: 'test',
        body: [],
        description: 'Test',
      };
      expect(validateSnippet(invalidSnippet)).toBe(false);
    });
  });

  describe('Neuron Snippet', () => {
    it('should contain Neuron class import', () => {
      const snippets = getSynapseSnippets();
      const neuronSnippet = snippets.find((s) => s.prefix === 'neuron');
      const bodyText = neuronSnippet?.body.join('\n');
      expect(bodyText).toContain('@synapse');
      expect(bodyText).toContain('Neuron');
    });

    it('should have placeholder for class name', () => {
      const snippets = getSynapseSnippets();
      const neuronSnippet = snippets.find((s) => s.prefix === 'neuron');
      const bodyText = neuronSnippet?.body.join('\n');
      expect(bodyText).toMatch(/\$\{1:.*\}/); // VSCode snippet placeholder syntax
    });

    it('should include process method', () => {
      const snippets = getSynapseSnippets();
      const neuronSnippet = snippets.find((s) => s.prefix === 'neuron');
      const bodyText = neuronSnippet?.body.join('\n');
      expect(bodyText).toContain('process');
    });
  });

  describe('Circuit Snippet', () => {
    it('should contain Circuit class import', () => {
      const snippets = getSynapseSnippets();
      const circuitSnippet = snippets.find((s) => s.prefix === 'circuit');
      const bodyText = circuitSnippet?.body.join('\n');
      expect(bodyText).toContain('@synapse');
      expect(bodyText).toContain('Circuit');
    });

    it('should have placeholder for circuit name', () => {
      const snippets = getSynapseSnippets();
      const circuitSnippet = snippets.find((s) => s.prefix === 'circuit');
      const bodyText = circuitSnippet?.body.join('\n');
      expect(bodyText).toMatch(/\$\{1:.*\}/);
    });
  });
});
