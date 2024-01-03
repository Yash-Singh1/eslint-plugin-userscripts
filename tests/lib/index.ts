import fs from 'node:fs';
import 'should';

import * as plugin from '../../lib';

describe('config', () => {
  it('should have all rules', () => {
    Object.keys(plugin.configs.recommended.rules)
      .map((ruleOption) => ruleOption.split('/')[1])
      .sort()
      .should.deepEqual(
        fs.readdirSync('lib/rules').map((filename) => filename.split('.ts')[0])
      );
  });
});

describe('rules', () => {
  it('should have meta.docs.url', () => {
    plugin.rules[Object.keys(plugin.rules)[0]].meta!.docs!.url!.should.be
      .String;
  });
});
