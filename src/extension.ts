import * as vscode from 'vscode';
import { registerHelloWorld } from './commands';

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
    console.log('Synapse extension is now active');

    // Register commands
    registerHelloWorld(context, outputChannel);

    const activationTime = Date.now() - startTime;
    outputChannel.appendLine(`Synapse extension activated successfully in ${activationTime}ms`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to activate Synapse extension:', errorMessage);
    vscode.window.showErrorMessage(`Failed to activate Synapse extension: ${errorMessage}`);
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
