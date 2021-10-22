# `no-invalid-headers`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `no-invalid-headers` rule verifies that all the userscript headers are valid.

## Why?

So as to avoid typos in the userscript headers which might have unintended consequences.

## Options

This rule has an object option:

- `"allowed"`: an array of headers to whitelist

## Examples

### `allowed`: `[]`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/no-invalid-headers: ["error", { allowed: [] }] */

// ==UserScript==
// @name           Bottom Padding to Swagger UI
// @namespace      https://github.com/Yash-Singh1/UserScripts
// @version        1.3
// @description    My description
// @description:en My description internationalized
// @author         John Doe
// @match          https://*/*
// @match          http://*/*
// @grant          none
// @nocompat       Chrome
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/no-invalid-headers: ["error", { allowed: [] }] */

// ==UserScript==
// @naem          MyName
// @description:  My description
// @supportUrl    https://example.com
// ==/UserScript==
```

### `allowed`: `[ "whitelisted" ]`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/no-invalid-headers: ["error", { allowed: [ "whitelisted" ] }] */

// ==UserScript==
// @name           Bottom Padding to Swagger UI
// @namespace      https://github.com/Yash-Singh1/UserScripts
// @version        1.3
// @description    My description
// @description:en My description internationalized
// @author         John Doe
// @match          https://*/*
// @match          http://*/*
// @grant          none
// @nocompat       Chrome
// @whitelisted    Custom header
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/no-invalid-headers: ["error", { allowed: [ "whitelisted" ] }] */

// ==UserScript==
// @name            MyName
// @description     My description
// @whitelisted     whitelisted value
// @notwhitelisted  this header is not whitelisted
// ==/UserScript==
```

## When Not to Use It

Turn off this rule if you don't want to check the validity of the userscript headers.
