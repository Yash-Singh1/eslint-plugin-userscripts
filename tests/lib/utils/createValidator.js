const createValidator = require('../../../lib/utils/createValidator.js');
const assert = require('assert');

it('should properly generate description', () => {
  assert.strictEqual(
    createValidator({ name: 'attributeName' }).meta.docs.description,
    'validate attributeName in the metadata for userscripts'
  );
  assert.strictEqual(
    createValidator({ name: 'attributeName', required: true }).meta.docs
      .description,
    'require attributeName in the metadata for userscripts'
  );
  assert.strictEqual(
    createValidator({
      name: 'attributeName2',
      required: true,
      validator: (
        /* eslint-disable-next-line no-unused-vars */
        arg
      ) => {}
    }).meta.docs.description,
    'require and validate attributeName2 in the metadata for userscripts'
  );
});
