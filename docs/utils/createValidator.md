# Create Validator

Create validator is a utility that makes it easier to create validators for
certain headers (or many). Many of the internal rules are built on top of this
utility. It returns an ESLint rule that can be passed
to ESLint's configuration.

## Usage

Import the utility:

```js
const createValidator = require('eslint-plugin-userscripts/lib/utils/createValidator.js');
```

## API

The `createValidator` function takes an object as an input. The only required
property is `name`.

### `name`

- Type: `string` or `Array<string>`
- Default: none
- Required: `true`

The name of the attribute(s) that the rule validates.

### `required`

- Type: `boolean`
- Default: `false`
- Required: `false`

Whether the attribute(s) are required or not.

### `validator`

- Type: `Function` or `false`
- Default: `false`
- Required: `false`

The custom validator function.

Arguments (without `runOnce` enabled):

- `attrVal`: Object with properties

  - `val`: `string` with the comment's attributes value
  - `loc`: Location of the comment. Object with properties
    - `start`: Start location, contains 0-based column and 1-based line
    - `end`: Same as `start` but except for end
  - `comment`: The node of the comment itself
  - `key`: `string` with the keyname of the header

- `index`: An `integer` n where the current header is the nth header when
  reading the metadata from top to bottom

- `indexMatch`: The occurrence of the header keyname in the metadata. E.g. in
  `a,c,a,b`, selecting b would give the index `2` removing repetition gives you
  `a,c,b` where `b` is 3rd or at the index `2`

- `metadata`: The metadata as an object. Values can be arrays
  (meaning there are multiple) or simple values. All items or itself will have the
  same type as the `attrVal` property.

- `context`: ESLint's `context` object. Used for reporting errors, getting the
  filename, scope, etc. Consult their
  [documentation](https://eslint.org/docs/developer-guide/working-with-rules#the-context-object)
  for more

- `keyName`: A `string` representing the current keyname. Useful for situations
  where there is more than one match for the header

With `runOnce` enabled, `attrVal`, `index`, `indexMatch`, `keyName` will be arrays.
See the [`runOnce` documentation](#runonce) for more information.

### `messages`

- Type: `Object`
- Default: `{}`
- Required: `false`

Message ID to template mapping for messages that will be passed to the metadata
for ESLint. This is used when you want to isolate a message's templating when
reporting errors to a separate place and repetition. See the [ESLint documentation](https://eslint.org/docs/developer-guide/working-with-rules#messageids)
for more. Note that internally, `missingAttribute` is used.

### `fixable`

- Type: `boolean`
- Default: `false`
- Required: `false`

A `boolean` indicating whether your rule is fixable or not. Required if you are
passing fixers to `context.report`.

### `regexMatch`

- Type: `RegExp`
- Default: regular expression combining all the `name`(s)
- Required: `false`

Overrides the `name` property (it is still required for the metadata).

### `runOnce`

- Type: `boolean`
- Default: `false`
- Required: `false`

Makes the validator run only once on all the metadata.

### `schema`

- Type: `Object` (Array of JSON Schemas)
- Default: none
- Required: `false`

See the [documentation](https://eslint.org/docs/developer-guide/working-with-rules#options-schemas).
Note that if `required` is enabled, this will be overridden a string option taking
`required` or `optional`.
