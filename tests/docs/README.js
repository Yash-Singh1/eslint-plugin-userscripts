const fs = require('fs');
const recommendedRules = new Set(
  Object.entries(require('../../').configs.recommended.rules)
    .filter((entry) => entry[1] !== 'off')
    .map((entry) => entry[0].split('/')[1])
);

/** @type {import('markdownlint').Rule} */
module.exports = {
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
    const doneRules = [];

    for (const token of params.tokens.filter(
      (token) => token.type === 'td_open'
    )) {
      token.line = token.line.trim().slice(4);
      const ruleName = token.line.split('`')[0];
      if (!rules.includes(ruleName)) {
        onError({
          lineNumber: token.lineNumber,
          detail: `${ruleName} is not a valid rule that exists`
        });
      } else if (!doneRules.includes(ruleName)) {
        doneRules.push(ruleName);
        if (recommendedRules.has(ruleName) && !token.line.includes('✅')) {
          onError({
            lineNumber: token.lineNumber,
            detail: `${ruleName} is recommended but not marked as such in the README`
          });
        } else if (
          !recommendedRules.has(ruleName) &&
          token.line.includes('✅')
        ) {
          onError({
            lineNumber: token.lineNumber,
            detail: `${ruleName} isn't recommended in the configuration but marked as such in the README`
          });
        }
        if (
          token.line.split('`](')[1].split(')')[0] !==
          `docs/rules/${ruleName}.md`
        ) {
          onError({
            lineNumber: token.lineNumber,
            detail: `Incorrect format for the link for ${ruleName}`
          });
        }
      }
    }

    const tableOpen = params.tokens.find(
      (token) => token.type === 'table_open'
    );
    for (const undocumentedRule of rules.filter(
      (rule) => !doneRules.includes(rule)
    )) {
      onError({
        lineNumber: tableOpen.lineNumber,
        detail: `Rule ${undocumentedRule} is not documented in the README`
      });
    }
  }
};
