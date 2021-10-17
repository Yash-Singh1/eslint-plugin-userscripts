# `require-attribute-space-prefix`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `require-attribute-space-prefix` rule verifies that the header attribute are
prefixed by at least one space.

## Why?

To ensure maximum compatibility.

## Options

This rule has no options.

## Examples

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-attribute-space-prefix: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// ==/UserScript==
```

```js
/* eslint userscripts/require-attribute-space-prefix: "error" */

// ==UserScript==
//  @name         Deletes the X Button
//  @description  Some info on my userscript
// ==/UserScript==
```

```js
/* eslint userscripts/require-attribute-space-prefix: "error" */

// ==UserScript==
//  @name         Deletes the X Button
//
//  @description  Some info on my userscript
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-attribute-space-prefix: "error" */

// ==UserScript==
// @name         Deletes the X Button
//@description  Some info on my userscript
// ==/UserScript==
```

```js
/* eslint userscripts/require-attribute-space-prefix: "error" */

// ==UserScript==
//@description  Some info on my userscript
//@name         Deletes the X Button
// ==/UserScript==
```

## When Not to Use It

This rule should apply to all userscripts.
