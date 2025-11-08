import * as vscode from 'vscode';

/**
 * Register the Hello World command
 * @param context - Extension context
 * @param outputChannel - Output channel for logging
 */
export function registerHelloWorld(
  context: vscode.ExtensionContext,
  outputChannel: vscode.OutputChannel
): void {
  const disposable = vscode.commands.registerCommand('synapse.helloWorld', () => {
    try {
      void vscode.window.showInformationMessage('Hello from Synapse!');
      outputChannel.appendLine('Hello World command executed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      outputChannel.appendLine(`Error executing Hello World command: ${errorMessage}`);
      void vscode.window.showErrorMessage(`Synapse: ${errorMessage}`);
    }
  });

  context.subscriptions.push(disposable);
  outputChannel.appendLine('Hello World command registered');
}
