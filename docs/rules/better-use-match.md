# `better-use-match`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `better-use-match` rule recommends that you use the `match` attribute over
the `include` attribute.

## Why?

Chrome Manifest Version 3 will probably result in deprecation of support for the
`include` attribute for security reasons.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/better-use-match: "warning" */

// ==UserScript==
// @match example.com
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/better-use-match: "warning" */

// ==UserScript==
// @include example.com
// ==/UserScript==
```

## When Not to Use It

You should not use this rule if you're not interested in supporting Chrome versions
beginning from early 2023 or depend on certain features that aren't available in
`match`.
