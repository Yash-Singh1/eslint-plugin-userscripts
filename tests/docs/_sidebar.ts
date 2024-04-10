import fs from 'node:fs';
import type { Rule, MarkdownItToken } from 'markdownlint';

const plugin = {
  names: ['table-all-rules'],
  tags: ['tables'],
  description: 'Ensures that all the rules are implemented in the READMEs',
  information: new URL(
    'https://github.com/Yash-Singh1/eslint-plugin-userscripts'
  ),
  function: function rule(params, onError) {
    const rules = fs
      .readdirSync('lib/rules')
      .map((ruleJs) => ruleJs.split('.')[0]);
    const doneRules: string[] = [];

    let utilitiesStarted = false;
    params.parsers.markdownit.tokens = params.parsers.markdownit.tokens.reduce(
      (allTokens, token) => {
        if (token.line === '- Utilities') {
          utilitiesStarted = true;
        }
        if (
          (token.content === 'Rules' || allTokens.length > 0) &&
          !utilitiesStarted
        ) {
          allTokens.push(token);
        }
        return allTokens;
      },
      [] as MarkdownItToken[]
    );

    for (const token of params.parsers.markdownit.tokens) {
      if (token.line === '- Rules' || token.type !== 'inline') continue;
      const ruleName = token.line.trim().split('`')[1];
      if (typeof ruleName !== 'string') continue;
      if (!rules.includes(ruleName)) {
        onError({
          lineNumber: token.lineNumber,
          detail: `${ruleName} is not a valid rule that exists`
        });
      } else if (!doneRules.includes(ruleName)) {
        doneRules.push(ruleName);
        if (
          token.line.split('`](')[1].split(')')[0] !== `rules/${ruleName}.md`
        ) {
          onError({
            lineNumber: token.lineNumber,
            detail: `Incorrect format for the link for ${ruleName}`
          });
        }
      }
    }

    for (const undocumentedRule of rules.filter(
      (rule) => !doneRules.includes(rule)
    )) {
      onError({
        lineNumber: params.parsers.markdownit.tokens[0].lineNumber,
        detail: `Rule ${undocumentedRule} is not documented in the sidebar`
      });
    }
  },
  parser: 'markdownit'
} satisfies Rule;

export const names = plugin.names;
export const tags = plugin.tags;
export const description = plugin.description;
export const information = plugin.information;
const function_ = plugin.function;

export { function_ as function };
