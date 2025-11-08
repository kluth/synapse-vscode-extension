import * as vscode from 'vscode';

/**
 * Extension activation function
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('Synapse extension is now active');

  // Register Hello World command
  const disposable = vscode.commands.registerCommand('synapse.helloWorld', () => {
    vscode.window.showInformationMessage('Hello from Synapse!');
  });

  context.subscriptions.push(disposable);
}

/**
 * Extension deactivation function
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  // Cleanup resources
}
