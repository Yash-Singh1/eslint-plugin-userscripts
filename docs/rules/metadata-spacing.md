# `metadata-spacing`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

<!-- markdownlint-disable-next-line no-blanks-blockquote -->

> 🔧 The `--fix` option on the command line can automatically fix some of the
> problems reported by this rule.

The `metadata-spacing` rule ensures that there is a newline between the code and
the metadata.

## Why?

To follow best practices for userscript code styling.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/metadata-spacing: "error" */

// ==UserScript==
// @name         My UserScript
// @description  Empties the document
// ==/UserScript==

document.documentElement.remove();
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/metadata-spacing: "error" */

// ==UserScript==
// @name         My UserScript
// @description  Empties the document
// ==/UserScript==
document.documentElement.remove();
```

## When Not to Use It

Turn off this rule when your code style demands no newline between the code
and the metadata.
