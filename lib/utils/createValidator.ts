import { ParsingResult, parse, type SourceLocation } from './parse';
import type { Rule } from 'eslint';

type JSONSchema4 = Rule.RuleMetaData['schema'];

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

type ValidatorCallback<SingleCall extends boolean> = (validationInfo: {
  attrVal: SingleCall extends true ? Metadata[] : Metadata;
  index: SingleCall extends true ? number[] : number;
  metadata: Record<string, Metadata | Metadata[]>;
  context: Rule.RuleContext;
  keyName: SingleCall extends true ? string[] : string;
}) => void;

interface Options {
  /**
   * Name of the attribute to validate
   */
  name: string | string[];

  /**
   * Description of the rule
   */
  description?: string;

  /**
   * Whether the attribute is required, this will ignore your custom validator and use the default one
   */
  required?: boolean;

  /**
   * Message ID to message template mapping
   *
   * @see https://eslint.org/docs/latest/extend/custom-rules#using-message-placeholders
   */
  messages?: Record<string, string>;

  /**
   * Custom regular expression that the attribute name must match
   * Overrides the `name` option
   */
  regexMatch?: RegExp;

  /**
   * Whether the rule is fixable or not, adds in metadata property `fix`
   */
  fixable?: boolean;

  /**
   * JSON Schema to validate attribute options
   */
  schema?: JSONSchema4;
}

interface OptionsRunOnce extends Options {
  /**
   * Custom validator function, if using `runOnce` this will be called once with all matching attributes
   */
  validator?: ValidatorCallback</* SingleCall */ true> | false;

  /**
   * Whether to run the validator once or for each attribute
   */
  runOnce: true;
}

interface OptionsRunMultiple extends Options {
  /**
   * Custom validator function, if using `runOnce` this will be called once with all matching attributes
   */
  validator?: ValidatorCallback</* SingleCall */ false> | false;

  /**
   * Whether to run the validator once or for each attribute
   */
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

/**
 * Creates a rule that validates metadata
 *
 * @example
 * ```ts
 * // Basic example that requires homepageURL if homepage is present
 * export default createValidator({
 *    name: 'homepage',
 *    required: false,
 *    validator: ({ attrVal, context, metadata }) => {
 *        if (!('homepageURL' in metadata)) {
 *            context.report({
 *               loc: attrVal.loc,
 *               messageId: 'missingAttribute',
 *               data: {
 *                   attribute: 'homepageURL'
 *               },
 *            });
 *        }
 *    },
 * });
 * ```
 *
 * @returns Rule including metadata and rule function
 */
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
  description,
  schema
}: OptionsRunMultiple | OptionsRunOnce) {
  const nameList: string[] = typeof name === 'string' ? [name] : name;

  return {
    meta: {
      type: 'suggestion',
      docs: {
        description:
          description ||
          `${
            required
              ? `require ${validator ? 'and validate ' : ''}`
              : 'validate '
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

        const metadataVal = {
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
          (<Metadata[]>metadata[line.metadataValue.key]).push(metadataVal);
          continue;
        }

        metadata[line.metadataValue.key] = metadataVal;
      }

      const metadataKeys = Object.keys(metadata);
      const startComment = comments.find(
        (comment) =>
          comment.value.trim() === '==UserScript==' && comment.type === 'Line'
      );

      // istanbul ignore else
      if (
        required &&
        result.enteredMetadata !== -1 &&
        startComment &&
        startComment.loc &&
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
          const attributeValues = matchingMetadataKeyIndex.flatMap(
            (index) => metadata[metadataKeys[index]]
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

      return {} as Record<string, never>;
    }
  } satisfies Rule.RuleModule;
}
