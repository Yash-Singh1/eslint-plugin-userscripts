# `no-invalid-metadata`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `no-invalid-metadata` rule verifies that the userscript metadata for the file
is valid.

## Why?

So errors don't come and the metadata is provided for ease of handling userscripts
and users in production.

## Options

This rule has an object option:

- `"top"` (default: `"required"`) requires that the metadata be on the top of the
  file

## Examples

### `top`: `"required"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// ==/UserScript==
```

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// @name My Userscript's Name
// @description Description on my userscript
//
// @version 1.0.0
// @license ISC
//
// @grant none
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

console.log('starting userscript');

// ==UserScript==
// ==/UserScript==
```

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// @name My Userscript's Name
// description Description on my userscript
// @license ISC
// ==/UserScript==
```

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// @name My Userscript's Name
// @description Description on my userscript
// @license ISC
```

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// @name My Userscript's Name
console.log('some code in between');
// @description Description on my userscript
// @license ISC
// ==/UserScript==
```

### `top`: `"optional"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

console.log('starting userscript');

// ==UserScript==
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/no-invalid-metadata: ["error", { top: "required" }] */

// ==UserScript==
// @name My Userscript's Name
// @description Description on my userscript
// @license ISC
```

## When Not to Use It

Turn off this rule when you are not linting userscripts or know that any of the
above conditions won't cause a problem on your end.
