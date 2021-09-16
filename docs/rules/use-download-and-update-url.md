# `use-download-and-update-url`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

<!-- markdownlint-disable-next-line MD033 -->

> 🔧 The `--fix` option on the command line can automatically fix some of the
> problems reported by this rule.

The `use-download-and-update-url` rule verifies that if the `updateURL` attribute
is present then the `downloadURL` attribute is too and vice versa.

## Why?

For compatibility with different userscript runners.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/use-homepage-and-url: "error" */

// ==UserScript==
// @updateURL     example.com
// @downloadURL  example.com
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/use-homepage-and-url: "error" */

// ==UserScript==
// @downloadURL     example.com
// ==/UserScript==
```

## When Not to Use It

When you are sure that the userscript runner that you and your users use is
compatible with your choice.
