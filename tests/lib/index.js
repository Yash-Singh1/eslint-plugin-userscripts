const requireindex = require('requireindex');
const fs = require('fs');

require('should');

describe('config', () => {
  it('should have all rules', () => {
    Object.keys(require('../..').configs.recommended.rules)
      .map((ruleOption) => ruleOption.split('/')[1])
      .sort()
      .should.deepEqual(
        fs.readdirSync('lib/rules').map((filename) => filename.split('.js')[0])
      );
  });
});

module.exports = requireindex(__dirname.replace(/\/tests(\/lib)$/, '$1/rules'));
