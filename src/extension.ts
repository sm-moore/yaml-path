import * as vscode from "vscode";
import { StatusBarView, StatusBarController } from "./statusbar";
import YamlPathHoverProvider from "./hover";

let currentPath: {} = { path: "init" };

export function activate(context: vscode.ExtensionContext) {
	console.log('"yaml-path" is now active.');

	let disposable = vscode.commands.registerCommand("yaml-path.copyPath", () => {
		vscode.env.clipboard.writeText(currentPath["path"]).then(() => {
			vscode.window.showInformationMessage("YAML Path Copied.");
		});
	});

	const statusBar = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left
	);
	const controller = new StatusBarController(
		new StatusBarView(statusBar),
		currentPath
	);

	const hover = vscode.languages.registerHoverProvider(
		"yaml",
		new YamlPathHoverProvider()
	);

	context.subscriptions.push(controller);
	context.subscriptions.push(disposable);
	context.subscriptions.push(hover);
}

export function deactivate() {}
