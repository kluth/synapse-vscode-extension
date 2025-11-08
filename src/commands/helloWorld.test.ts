import * as vscode from 'vscode';

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

    it('should show information message when executed', async () => {
      // Mock vscode.window.showInformationMessage
      const showInfoSpy = jest.spyOn(vscode.window, 'showInformationMessage');

      // Execute the command
      await vscode.commands.executeCommand('synapse.helloWorld');

      // Verify it showed the message
      expect(showInfoSpy).toHaveBeenCalledWith('Hello from Synapse!');

      showInfoSpy.mockRestore();
    });
  });
});
