/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Mock vscode module for unit tests
 */

export enum ExtensionMode {
  Production = 1,
  Development = 2,
  Test = 3,
}

export class Uri {
  static file(path: string): Uri {
    return new Uri(path);
  }

  constructor(public fsPath: string) {}
}

export const window = {
  createOutputChannel: jest.fn(() => ({
    appendLine: jest.fn(),
    dispose: jest.fn(),
  })),
  showInformationMessage: jest.fn(() => Promise.resolve()),
  showErrorMessage: jest.fn(() => Promise.resolve()),
  showWarningMessage: jest.fn(() => Promise.resolve()),
};

export const commands = {
  registerCommand: jest.fn((_command: string, _callback: (...args: any[]) => any) => ({
    dispose: jest.fn(),
  })),
  executeCommand: jest.fn(),
};

export const workspace = {
  createFileSystemWatcher: jest.fn(() => ({
    onDidChange: jest.fn(),
    onDidCreate: jest.fn(),
    onDidDelete: jest.fn(),
    dispose: jest.fn(),
  })),
  workspaceFolders: [],
};

export class FileSystemWatcher {
  onDidChange = jest.fn();
  onDidCreate = jest.fn();
  onDidDelete = jest.fn();
  dispose = jest.fn();
}

export class Position {
  constructor(
    public line: number,
    public character: number
  ) {}
}

export class Range {
  constructor(
    public start: Position,
    public end: Position
  ) {}
}

export enum CompletionItemKind {
  Text = 0,
  Method = 1,
  Function = 2,
  Constructor = 3,
  Field = 4,
  Variable = 5,
  Class = 6,
  Interface = 7,
  Module = 8,
  Property = 9,
  Unit = 10,
  Value = 11,
  Enum = 12,
  Keyword = 13,
  Snippet = 14,
  Color = 15,
  File = 16,
  Reference = 17,
}

export class CompletionItem {
  label: string;
  kind?: CompletionItemKind;
  detail?: string;
  documentation?: string;
  insertText?: string;
  range?: Range;

  constructor(label: string, kind?: CompletionItemKind) {
    this.label = label;
    this.kind = kind;
  }
}

export class MarkdownString {
  value: string;
  isTrusted?: boolean;
  supportThemeIcons?: boolean;

  constructor(value?: string) {
    this.value = value || '';
  }

  appendText(value: string): MarkdownString {
    this.value += value;
    return this;
  }

  appendMarkdown(value: string): MarkdownString {
    this.value += value;
    return this;
  }

  appendCodeblock(value: string, language?: string): MarkdownString {
    this.value += `\`\`\`${language || ''}\n${value}\n\`\`\``;
    return this;
  }
}

export class Hover {
  contents: MarkdownString[];
  range?: Range;

  constructor(contents: MarkdownString | MarkdownString[], range?: Range) {
    this.contents = Array.isArray(contents) ? contents : [contents];
    this.range = range;
  }
}

export const languages = {
  registerCompletionItemProvider: jest.fn(() => ({
    dispose: jest.fn(),
  })),
  registerHoverProvider: jest.fn(() => ({
    dispose: jest.fn(),
  })),
};
