# `require-version`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `require-version` rule verifies that a valid version attribute is present.

## Why?

To prevent errors and keeping track of changes and ensuring updates get pushed.

## Options

This rule has a string option:

- `"required"` (default) requires that the version attribute is present
- `"optional"` makes the version attribute optional

## Examples

## `"required"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-version: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// @version      2.0.0
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-version: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// @version      0.0
// ==/UserScript==
```

## `"optional"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-version: ["error", "optional"] */

// ==UserScript==
// @description  Some info on my userscript
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-version: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// @version      0.0
// ==/UserScript==
```

## When Not to Use It

Don't use this rule when you are not using versions and pushing to production.
It is recommended that you enable this rule with the `"optional"` option in that
case.
