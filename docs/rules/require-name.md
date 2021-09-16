# `require-name`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

<!-- markdownlint-disable-next-line MD033 -->

> 🔧 The `--fix` option on the command line can automatically fix some of the
> problems reported by this rule.

The `require-name` rule verifies that the name attribute is present and there is
no more than one of it. It also ensures that it is the first attribute.

## Why?

To prevent errors and allow the user to understand what userscripts they have installed.

## Options

This rule has a string option:

- `"required"` (default) requires that the name attribute is present
- `"optional"` makes the name attribute optional

## Examples

## `"required"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-name: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-name: "error" */

// ==UserScript==
// @description  Some info on my userscript
// ==/UserScript==
```

```js
/* eslint userscripts/require-name: "error" */

// ==UserScript==
// @description  Some info on my userscript
// @name         Deletes the X Button
// @name         Deletes the X Button 2
// ==/UserScript==
```

## `"optional"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-name: ["error", "optional"] */

// ==UserScript==
// @description  Some info on my userscript
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-name: ["error", "optional"] */

// ==UserScript==
// @description  Some info on my userscript
// @name         Deletes the X Button
// ==/UserScript==
```

## When Not to Use It

This rule should apply to all userscripts.
