import type { SourceCode } from 'eslint';

interface Line {
  value: string;
  lineLoc: SourceLocation;
  codeBetween: boolean;
  end: boolean;
  start: boolean;
  invalid: boolean;
}

// Would import this from acorn, but tsup type resolution is broken

export interface SourceLocation {
  source?: string | null
  start: Position
  end: Position
}

export interface Position {
  /** 1-based */
  line: number
  /** 0-based */
  column: number
}

export interface ParsingResult {
  /**
   * Whether the metadata has ended
   */
  end: boolean;

  /**
   * The location of the starting of the metadata
   */
  enteredMetadata: number;

  /**
   * The lines of the metadata
   */
  lines: (
    | (Line & {
        metadataInfo: true;
        metadataValue: { key: string; value: string };
      })
    | (Line & {
        metadataInfo: false;
      })
  )[];
}

/**
 * Parses the UserScript metadata from the source code
 *
 * @param sourceCode The ESLint source code object
 * @returns {ParsingResult} The parsing result
 */
export function parse(sourceCode: SourceCode) {
  const defaultLineInfo = {
    codeBetween: false,
    end: false,
    start: false,
    invalid: false,
    metadataInfo: false as const
  };

  const result: ParsingResult = {
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
    const commentContent = trimmedLine.slice(2).trim();

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
      commentContent === '==/UserScript=='
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
      commentContent === '==UserScript=='
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
      commentContent !== '' // nor an empty line, (see #8 above)
    ) {
      if (
        commentContent.startsWith('@') // is a header
      ) {
        const mainContent = commentContent.slice(1);

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
