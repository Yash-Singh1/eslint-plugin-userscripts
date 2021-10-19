# `no-invalid-grant`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `no-invalid-grant` rule verifies that the argument passed to `@grant` is valid.

## Why?

So as to avoid typos that might result in `GM_* is not defined` errors.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/no-invalid-grant: "error" */

// ==UserScript==
// @grant   GM_info
// @grant   GM.info
// @grant   GM_getValue
// @grant   GM.getValue
// @grant   GM_getResourceURL
// @grant   GM.getResourceUrl
// @grant   GM_xmlhttpRequest
// @grant   GM.xmlHttpRequest
// @grant   unsafeWindow
// @grant   window.onurlchange
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/no-invalid-grant: "error" */

// ==UserScript==
// @grant   GM_notificaiton
// @grant   GM_getResourceUrl
// @grant   GM_xmlHttpRequest
// ==/UserScript==
```

## When Not to Use It

Turn off this rule if you don't want to check the validity of `@grant` arguments.
