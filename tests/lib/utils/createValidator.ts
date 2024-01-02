import { createValidator } from '../../../lib/utils/createValidator';
import assert from 'node:assert';

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
      validator: () => {}
    }).meta.docs.description,
    'require and validate attributeName2 in the metadata for userscripts'
  );
});
