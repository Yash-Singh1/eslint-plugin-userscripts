# `filename-user`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `filename-user` rule verifies that the filename ends in `.user.js`.

## Why?

It is a good practice to end userscripts in a `.user.js`.

## Options

This rule has a string option:

- `"always"` (default) requires the filename to end in `.user.js`
- `"never"` ensures that the filename never ends in `.user.js`

## Examples

### `"always"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/filename-user: "error" */

// hello.user.js
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/filename-user: "error" */

// hello.js
```

### `"never"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/filename-user: ["error", "never"] */

// hello.js
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/filename-user: ["error", "never"] */

// hello.user.js
```

## When Not to Use It

Turn off this rule when you are not linting userscripts.
