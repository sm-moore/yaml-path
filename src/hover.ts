import {
	CancellationToken,
	Hover,
	HoverProvider,
	Position,
	ProviderResult,
	TextDocument,
} from "vscode";
import { parseDocumentYamlAtPosition } from "./yamlparse";

class YamlPathHoverProvider implements HoverProvider {
	public provideHover(
		document: TextDocument,
		position: Position,
		token: CancellationToken
	): ProviderResult<Hover> {
		const selectedLine = document.lineAt(position);
		const columnIndex = selectedLine.text.indexOf(":");

		if (columnIndex > position.character) {
			return new Hover(parseDocumentYamlAtPosition(document, position));
		}
	}
}

export default YamlPathHoverProvider;
