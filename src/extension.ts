import * as vscode from 'vscode';
import {StatusBarView, StatusBarController} from './statusbar';


export function activate(context: vscode.ExtensionContext) {
	console.log('"yaml-path" is now active.');

	let disposable = vscode.commands.registerCommand('yaml-path.showPath', () => {
		vscode.window.showInformationMessage("YAML Path Activated, see status bar below.");
	});

	const statusBar =vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	const controller =new StatusBarController(new StatusBarView(statusBar));

	context.subscriptions.push(controller);
	context.subscriptions.push(disposable);
}


export function deactivate() {}
