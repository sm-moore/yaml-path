// Much of this code is directly copied from or inspired by https://github.com/CYBAI/vscode-yaml-key-viewer

const FIND_KEY_REGEX = /^\s*[\-|\s]?([\w|\s|\~\(|\)]*):.*/;

/**
 * Check if the line is empty string or only whitespace(s) or not
 */
function isEmptyOrWhitespace(str: string): boolean {
    const spaces = str.match(/\s/g) || '';
    return str === '' || spaces.length === str.length;
}

/**
 * Check if the line is a comment line or not
 */
function isCommentLine(str: string): boolean {
    return !!str.match(/^\s*#/);
}

/**
 * Check if the line contains a key or not
 */
function isKey(str: string): boolean {
    return !!str.match(FIND_KEY_REGEX);
}

/**
 * Find the closet key
 */
function findLineOfClosestKey(
    lines: Array<string>
): string {
    return (lines.filter(line => !isCommentLine(line) && isKey(line)).pop() || '');
}

/**
 * Parse the indentation space of the line, if it isn't indented, returns an empty string
 */
function textIndentations(str: string): string {
    return (str.match(/^\s*/) || [''])[0];
}

/**
 * Function to filter unnecessary lines, including empty line,
 * line with only whitespace(s) and comment line
 */
function isUnnecessaryLine(line: string): boolean {
    return !isEmptyOrWhitespace(line) && !isCommentLine(line);
}
/**
 * Parses yaml lines to get the key path of the currently selected lines.
 * @param selectedLineText line where the cursor is placed
 * @param lines yaml lines in the order they appear in the document.
 * @returns the key path.
 */
function parseYaml(selectedLineText: string, lines: string[]): string {
    // Remove `---` if it exists
    if (lines[0] === '---') {
        lines.shift();
    }

    const expectedIndentationLine = isKey(selectedLineText)
        ? selectedLineText
        : findLineOfClosestKey(lines);

    const expectedLineSpace = textIndentations(expectedIndentationLine);

    const keys = lines.filter(isUnnecessaryLine).reduce((result: Object, line): Object => {
            const spaces = textIndentations(line);

            if (expectedLineSpace.length >= spaces.length) {
                result[spaces] = line.replace(FIND_KEY_REGEX, '$1').trim();
            }

            return result;
        }, {});

    return Object.keys(keys).reduce((result, key) => {
        result += !result ? keys[key] : '.' + keys[key];
        return result;
    }, '');
}


export {
    isCommentLine,
    parseYaml
};