const createValidator = require('../../../lib/utils/createValidator.js');
const assert = require('assert');

it('should properly generate description', () => {
  assert.strictEqual(
    createValidator('attributeName', false).meta.docs.description,
    'validate attributeName in the metadata for userscripts'
  );
  assert.strictEqual(
    createValidator('attributeName', true).meta.docs.description,
    'require attributeName in the metadata for userscripts'
  );
  assert.strictEqual(
    createValidator(
      'attributeName2',
      true,
      (
        /* eslint-disable-next-line no-unused-vars */
        arg
      ) => {}
    ).meta.docs.description,
    'require and validate attributeName2 in the metadata for userscripts'
  );
});
