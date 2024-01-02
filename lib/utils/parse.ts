import type { SourceCode } from 'eslint';
import type { SourceLocation } from 'acorn';

type Line = {
  value: string;
  lineLoc: SourceLocation;
  codeBetween: boolean;
  end: boolean;
  start: boolean;
  invalid: boolean;
};

export type ParsingResult = {
  end: boolean;
  enteredMetadata: number;
  lines: (
    | (Line & {
        metadataInfo: true;
        metadataValue: { key: string; value: string };
      })
    | (Line & {
        metadataInfo: false;
      })
  )[];
};

export function parse(sourceCode: SourceCode) {
  const defaultLineInfo = {
    codeBetween: false,
    end: false,
    start: false,
    invalid: false,
    metadataInfo: false as const
  };

  let result: ParsingResult = {
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
}
