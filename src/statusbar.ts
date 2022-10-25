
import {StatusBarItem, Disposable, window, TextEditor, TextEditorSelectionChangeEvent} from 'vscode';
import { parseDocumentYaml } from './yamlparse';

export class StatusBarView {
    
    private _statusBarItem: StatusBarItem;
    
    constructor(statusBarItem: StatusBarItem) {
        this._statusBarItem = statusBarItem;
        this._statusBarItem.command = "yaml-path.copyPath";
    };
    
    refresh(text: string) {
        this._statusBarItem.text = text;
        this._statusBarItem.tooltip = 'YAML path';
        this._statusBarItem.show();
    }
}

export class StatusBarController {

    private _disposable: Disposable;
    currentPath: {};

    constructor(private view: StatusBarView, currentPath: {}) {
        const self = this;
        this.currentPath = currentPath;

        const disposables: Disposable[] = [];

        window.onDidChangeActiveTextEditor(self.onTextEditorChange, self, disposables);
        window.onDidChangeTextEditorSelection(self.onTextEditorSelectionChange, self, disposables);

        this.onTextEditorChange(window.activeTextEditor);

        this._disposable = Disposable.from(...disposables);
    }

    onTextEditorChange(editor: TextEditor) : void {
        this.clear();
        if (!editor) {return;}
        const doc = editor.document;
        if (!doc) {return;}

        const yamlPath = parse(editor);
        this.currentPath['path'] = yamlPath;
        this.show(yamlPath);
    }

    onTextEditorSelectionChange(textEditorSelectionChangeEvent: TextEditorSelectionChangeEvent) : void {
        this.onTextEditorChange(textEditorSelectionChangeEvent.textEditor);
    }

    clear() {
        this.view.refresh('');
    }

    show(parsedYaml: string) : void {
        this.view.refresh(parsedYaml);
    }

    dispose() {
        this._disposable.dispose();
    }
}

function parse(editor: TextEditor){
    switch (editor.document.languageId) {
        case 'yaml': {
            return parseDocumentYaml(editor);
        }
        default:
            return '';
    }
}
