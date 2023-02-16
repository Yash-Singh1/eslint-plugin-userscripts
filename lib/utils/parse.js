/**
 * The result of parsing the metadata
 *
 * @typedef {Object} ParsingResult Result of the metadata parser
 * @property {boolean} end Whether the metadata ended or not
 * @property {number} enteredMetadata The index line of where the metadata began
 *   (-1 by default)
 * @property {{
 *   value: string;
 *   lineLoc: import('acorn')['SourceLocation'];
 *   codeBetween: boolean;
 *   end: boolean;
 *   start: boolean;
 *   invalid: boolean;
 *   metadataInfo: boolean;
 *   metadataValue: { key: string; value: string } | undefined;
 * }[]} lines
 *   Array of lines in the metadata
 */

/**
 * Parses metadata in source code
 *
 * @param {import('eslint')['SourceCode']['prototype']} sourceCode The
 *   sourceCode brought from context.getSourceCode()
 * @returns {ParsingResult} The result of parsing the metadata
 */
module.exports = function parse(sourceCode) {
  const defaultLineInfo = {
    codeBetween: false,
    end: false,
    start: false,
    invalid: false,
    metadataInfo: false
  };

  let result = {
    end: false,
    enteredMetadata: -1,
    lines: []
  };

  let inMetadata = false;
  let done = false;

  for (const [index, line] of sourceCode.lines.entries()) {
    if (done) {
      continue;
    }

    const lineLoc = {
      start: {
        line: index + 1,
        column: 0
      },
      end: {
        line: index + 1,
        column: line.length
      }
    };

    const trimmedLine = line.trim();
    const isLineComment = trimmedLine.startsWith('//');

    if (
      // https://github.com/Yash-Singh1/eslint-plugin-userscripts/issues/8
      inMetadata &&
      !isLineComment && // line is not a comment,
      trimmedLine !== '' // and *actually* contains something other than spaces
    ) {
      result.lines.push({
        value: line,
        lineLoc,
        ...defaultLineInfo,
        codeBetween: true
      });
    } else if (
      inMetadata &&
      isLineComment &&
      trimmedLine.slice(2).trim() === '==/UserScript=='
    ) {
      result.end = true;
      done = true;
      result.lines.push({
        value: line,
        lineLoc,
        ...defaultLineInfo,
        end: true
      });
    } else if (
      !inMetadata &&
      isLineComment &&
      trimmedLine.slice(2).trim() === '==UserScript=='
    ) {
      result.enteredMetadata = index;
      inMetadata = true;
      result.lines.push({
        value: line,
        lineLoc,
        ...defaultLineInfo,
        start: true
      });
    } else if (
      inMetadata &&
      isLineComment &&
      trimmedLine.slice(2).trim() !== '' // nor an empty line, (see #8 above)
    ) {
      if (
        trimmedLine.slice(2).trim().startsWith('@') // is a header
      ) {
        const mainContent = trimmedLine.slice(2).trim().slice(1);

        result.lines.push({
          value: line,
          lineLoc,
          ...defaultLineInfo,
          metadataInfo: true,
          metadataValue: {
            key: mainContent.split(/[\t ]/)[0],
            value: mainContent.replace(/^.*?[\t ]/, '').trim()
          }
        });
      } else {
        result.lines.push({
          value: line,
          lineLoc,
          ...defaultLineInfo,
          invalid: true
        });
      }
    }
  }

  return result;
};
