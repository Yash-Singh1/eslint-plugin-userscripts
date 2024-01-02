import { ParsingResult, parse } from './parse';
import type { JSONSchema4 } from 'json-schema';
import type { SourceLocation } from 'acorn';
import type { Rule } from 'eslint';

export type Metadata = {
  comment: {
    loc: SourceLocation;
    type: 'Line';
    range: [number, number];
    value: string;
  };
  loc: SourceLocation;
  val: string;
  key: string;
};

type ValidatorCallback<UseArray extends boolean> = (validationInfo: {
  attrVal: UseArray extends true ? Metadata[] : Metadata;
  index: UseArray extends true ? number[] : number;
  metadata: Record<string, Metadata | Metadata[]>;
  context: Rule.RuleContext;
  keyName: string | string[];
}) => void;

interface Options {
  name: string | string[];
  required?: boolean;
  messages?: Record<string, string>;
  regexMatch?: RegExp;
  fixable?: boolean;
  regexMatxch?: RegExp;
  schema?: JSONSchema4;
}

interface OptionsRunOnce extends Options {
  validator?: ValidatorCallback<true> | false;
  runOnce: true;
}

interface OptionsRunMultiple extends Options {
  validator?: ValidatorCallback<false> | false;
  runOnce?: false;
}

type FilterTrue<T extends ParsingResult['lines'][number]> = T extends unknown
  ? T['metadataInfo'] extends true
    ? T
    : never
  : never;

function isRunOnce(
  validator: OptionsRunMultiple['validator'] | OptionsRunOnce['validator'],
  runOnce: boolean
): validator is OptionsRunOnce['validator'] {
  return runOnce;
}

export function createValidator({
  name,
  required = false,
  validator = false,
  messages = {},
  fixable = false,
  regexMatch = new RegExp(
    '^(' + (typeof name === 'string' ? name : name.join('|')) + ')$'
  ),
  runOnce = false,
  schema
}: OptionsRunMultiple | OptionsRunOnce) {
  const nameList: string[] = typeof name === 'string' ? [name] : name;

  return {
    meta: {
      type: 'suggestion',
      docs: {
        description: `${
          required ? `require ${validator ? 'and validate ' : ''}` : 'validate '
        }${nameList.join(' and ')} in the metadata for userscripts`,
        category: 'Best Practices'
      },
      schema: required
        ? [
            {
              enum: ['required', 'optional'],
              default: 'required'
            }
          ]
        : schema || undefined,
      messages: {
        missingAttribute: `Didn't find attribute '${nameList}' in the metadata`,
        ...messages
      },
      fixable: fixable ? 'code' : undefined
    },
    create: (context) => {
      const sourceCode = context.sourceCode;
      const comments = sourceCode.getAllComments();

      const result = parse(sourceCode);
      const metadata: Record<string, Metadata | Metadata[]> = {};
      const lines = result.lines.filter(
        (line) => line.metadataInfo
      ) as FilterTrue<ParsingResult['lines'][number]>[];
      for (const line of lines) {
        const actualValue = line.value.trim().slice(2);
        const lengthDiff = line.value.length - actualValue.length - 2;
        const newLoc = {
          start: {
            line: line.lineLoc.start.line,
            column: line.lineLoc.start.column + lengthDiff
          },
          end: line.lineLoc.end
        } satisfies SourceLocation;
        const val = {
          val: line.metadataValue.value,
          loc: newLoc,
          comment: {
            value: actualValue,
            range: [
              sourceCode.getIndexFromLoc(line.lineLoc.start) + lengthDiff,
              sourceCode.getIndexFromLoc(line.lineLoc.end)
            ],
            loc: newLoc,
            type: 'Line'
          },
          key: line.metadataValue.key
        } satisfies Metadata;
        // istanbul ignore else
        if (metadata[line.metadataValue.key]) {
          if (!Array.isArray(metadata[line.metadataValue.key])) {
            metadata[line.metadataValue.key] = [
              metadata[line.metadataValue.key] as Metadata
            ];
          }
          (metadata[line.metadataValue.key] as Metadata[]).push(val);
          continue;
        }
        metadata[line.metadataValue.key] = val;
      }

      const metadataKeys = Object.keys(metadata);
      const startComment = comments.find(
        (comment) =>
          comment.value.trim() === '==UserScript==' && comment.type === 'Line'
      );

      // istanbul ignore else
      if (
        startComment &&
        startComment.loc &&
        required &&
        result.enteredMetadata !== -1 &&
        (!context.options[0] || context.options[0] === 'required') &&
        !metadataKeys.some((metadataKeyName) =>
          regexMatch.test(metadataKeyName)
        )
      ) {
        context.report({
          loc: startComment.loc,
          messageId: 'missingAttribute'
        });
      } else if (
        validator &&
        metadataKeys.some((metadataKeyName) => regexMatch.test(metadataKeyName))
      ) {
        if (isRunOnce(validator, runOnce)) {
          const matchingMetadataKeyIndex: number[] = [];
          for (const metadataKeyIndex in metadataKeys) {
            if (regexMatch.test(metadataKeys[metadataKeyIndex])) {
              matchingMetadataKeyIndex.push(+metadataKeyIndex);
            }
          }
          const attributeValues = matchingMetadataKeyIndex
            .map((index) => metadata[metadataKeys[index]])
            .reduce(
              (accumalator: Metadata[], metadataPart) =>
                Array.isArray(metadataPart)
                  ? [...accumalator, ...metadataPart]
                  : [...accumalator, metadataPart],
              [] as Metadata[]
            );
          validator({
            attrVal: attributeValues,
            index: [...attributeValues.keys()],
            metadata,
            context,
            keyName: matchingMetadataKeyIndex.map(
              (index) => metadataKeys[index]
            )
          });
        } else {
          for (const metadataKeyIndex in metadataKeys) {
            if (!regexMatch.test(metadataKeys[metadataKeyIndex])) {
              continue;
            }
            if (Array.isArray(metadata[metadataKeys[metadataKeyIndex]])) {
              for (const [index, attrVal] of (
                metadata[metadataKeys[metadataKeyIndex]] as Metadata[]
              ).entries()) {
                validator({
                  attrVal,
                  index,
                  metadata,
                  context,
                  keyName: metadataKeys[metadataKeyIndex]
                });
              }
            } else {
              validator({
                attrVal: metadata[metadataKeys[metadataKeyIndex]] as Metadata,
                index: 0,
                metadata,
                context,
                keyName: metadataKeys[metadataKeyIndex]
              });
            }
          }
        }
      }

      return {};
    }
  } satisfies Rule.RuleModule;
}
