const fs = require('fs');

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

    let utilitiesStarted = false;
    params.tokens = params.tokens.reduce((allTokens, token) => {
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
    }, []);

    for (const token of params.tokens.filter(
      (token) => token.type === 'inline'
    )) {
      if (token.line === '- Rules') continue;
      token.line = token.line.trim();
      const ruleName = token.line.split('`')[1];
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
        lineNumber: params.tokens[0].lineNumber,
        detail: `Rule ${undocumentedRule} is not documented in the sidebar`
      });
    }
  }
};
