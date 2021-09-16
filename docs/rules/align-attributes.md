# `align-attributes`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

<!-- markdownlint-disable-next-line MD033 -->

> 🔧 The `--fix` option on the command line can automatically fix some of the
> problems reported by this rule.

The `align-attributes` rule verifies that the attributes are spaced out.

## Why?

For readability when debugging and editing the userscript.

## Options

This rule has a number option which represents the spaces after the longest
attribute name. Defaults to 2.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/align-attributes: "error" */

// ==UserScript==
// @updateURL     example.com
// @downloadURL   example.com
// ==/UserScript==
```

```js
/* eslint userscripts/align-attributes: ["error", 3] */

// ==UserScript==
// @updateURL      example.com
// @downloadURL    example.com
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/align-attributes: "error" */

// ==UserScript==
// @updateURL     example.com
// @downloadURL     example.com
// ==/UserScript==
```

```js
/* eslint userscripts/align-attributes: ["error", 3] */

// ==UserScript==
// @updateURL     example.com
// @downloadURL   example.com
// ==/UserScript==
```

## When Not to Use It

When you are not using userscripts or don't want to auto-align your attributes.
