import * as vscode from 'vscode';
import { registerHelloWorld } from './commands';
import { SynapseCompletionProvider } from './providers';

let outputChannel: vscode.OutputChannel;

/**
 * Extension activation function
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext): void {
  try {
    const startTime = Date.now();

    // Create output channel for logging
    outputChannel = vscode.window.createOutputChannel('Synapse');
    context.subscriptions.push(outputChannel);

    outputChannel.appendLine('Synapse extension is activating...');
    outputChannel.appendLine('Synapse extension is now active');

    // Register commands
    registerHelloWorld(context, outputChannel);

    // Register completion provider for TypeScript and JavaScript
    const completionProvider = new SynapseCompletionProvider();
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        ['typescript', 'javascript'],
        completionProvider
      )
    );
    outputChannel.appendLine('Completion provider registered');

    const activationTime = Date.now() - startTime;
    outputChannel.appendLine(`Synapse extension activated successfully in ${activationTime}ms`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    outputChannel?.appendLine(`Failed to activate Synapse extension: ${errorMessage}`);
    void vscode.window.showErrorMessage(`Failed to activate Synapse extension: ${errorMessage}`);
  }
}

/**
 * Extension deactivation function
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  if (outputChannel) {
    outputChannel.appendLine('Synapse extension is deactivating...');
    outputChannel.dispose();
  }
}
