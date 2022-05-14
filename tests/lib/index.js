const requireindex = require('requireindex');
const fs = require('fs');
const path = require('path');

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

describe('rules', () => {
  it('should have meta.docs.url', () => {
    console.log(
      require('../..').rules[Object.keys(require('../..').rules)[0]].meta.docs
    );
    require('../..').rules[Object.keys(require('../..').rules)[0]].meta.docs.url
      .should.be.String;
  });
});

module.exports = requireindex(
  __dirname.replace(/[/\\]tests([/\\]lib)$/, `$1${path.sep}rules`)
);
