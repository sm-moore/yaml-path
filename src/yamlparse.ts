// Much of this code is directly copied from or inspired by https://github.com/CYBAI/vscode-yaml-key-viewer

import * as vscode from 'vscode';

import * as util from './util';

function parseDocumentYaml({
    document,
    selection,
}: vscode.TextEditor): string {
    const selectedLine = document.lineAt(selection.active);
    const lastSelectedLineNumber = selection.end.line;

    if (selectedLine.isEmptyOrWhitespace || util.isCommentLine(selectedLine.text)) { return '';}

    const range = new vscode.Range(
        0,
        0,
        lastSelectedLineNumber,
        selectedLine.text.length
    );

    const lines: string[] = document.getText(range).split('\n');
    return util.parseYaml(selectedLine.text, lines);
}

export { parseDocumentYaml };