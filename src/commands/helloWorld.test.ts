/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */

describe('Hello World Command', () => {
  describe('synapse.helloWorld command', () => {
    it('should be registered in package.json', () => {
      // This test verifies the command exists in contributions
      const packageJson = require('../../package.json');
      const commands = packageJson.contributes.commands;

      const helloWorldCommand = commands.find(
        (cmd: any) => cmd.command === 'synapse.helloWorld'
      );

      expect(helloWorldCommand).toBeDefined();
      expect(helloWorldCommand.title).toBe('Synapse: Hello World');
    });

    // This test requires integration testing with VSCode API
    // Unit testing command execution is covered by extension.test.ts
    it.skip('should show information message when executed', async () => {
      // This would require full VSCode extension host integration
      // See extension.test.ts for command registration tests
    });
  });
});
