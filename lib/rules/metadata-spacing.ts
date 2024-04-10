import type { Rule } from 'eslint';
import { parse } from '../utils/parse';

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'ensure there is a newline between the metadata and the code',
      category: 'Best Practices'
    },
    fixable: 'whitespace',
    messages: {
      newlineBetween:
        'There should be a newline between the metadata and the code'
    }
  },
  create: (context) => {
    const sourceCode = context.sourceCode;
    const result = parse(sourceCode);

    const hasMetadata = result.enteredMetadata !== -1 && result.end;

    if (!hasMetadata) {
      return {};
    }

    const metadataLastLineLoc = result.lines.at(-1)?.lineLoc;
    if (!metadataLastLineLoc) {
      return {};
    }

    const hasCodeOtherThanMetadata =
      sourceCode.lines.length !== metadataLastLineLoc.end.line;

    if (!hasCodeOtherThanMetadata) {
      return {};
    }

    const lineNextToMetadata = sourceCode.lines[metadataLastLineLoc.end.line];

    if (lineNextToMetadata.trim().length > 0) {
      context.report({
        messageId: 'newlineBetween',
        loc: metadataLastLineLoc,
        fix: function (fixer) {
          const range = [
            sourceCode.getIndexFromLoc(metadataLastLineLoc.start),
            sourceCode.getIndexFromLoc(metadataLastLineLoc.end)
          ] satisfies [number, number];

          return fixer.insertTextAfterRange(range, '\n');
        }
      });
    }

    return {};
  }
} satisfies Rule.RuleModule;
