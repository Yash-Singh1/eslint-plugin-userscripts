# `require-download-url`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

<!-- markdownlint-disable-next-line no-blanks-blockquote -->

> 🔧 The `--fix` option on the command line can automatically fix some of the
> problems reported by this rule.

The `require-download-url` rule verifies that if the `updateURL` attribute
is present then the `downloadURL` attribute is too.

## Why?

The purpose of the `updateURL` attribute is to specify the metadata endpoint for
a userscript while a `downloadURL` represents the source endpoint. Several
userscript managers require that a `downloadURL` is present for updates as they
don't fallback to the `updateURL` for source downloads and use it solely for
metadata downloads. For more information, check out this GitHub issue ([#79](https://github.com/Yash-Singh1/eslint-plugin-userscripts/issues/79)).

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/use-homepage-and-url: "error" */

// ==UserScript==
// @updateURL     example.com
// @downloadURL  example.com
// ==/UserScript==
```

```js
/* eslint userscripts/use-homepage-and-url: "error" */

// ==UserScript==
// @downloadURL  example.com
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/use-homepage-and-url: "error" */

// ==UserScript==
// @updateURL     example.com
// ==/UserScript==
```

## When Not to Use It

One good reason to leave out this rule would be if you are developing for Greasemonkey
specifically, because Greasemonkey doesn't respect attributes regarding update mechanisms
and simply use the URL from where the userscript was downloaded initially as the
source.
