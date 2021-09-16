# `require-description`

> ✅ The "extends": "plugin:userscripts/recommended" property in a configuration
> file enables this rule.

The `require-description` rule verifies that the description attribute is present
and there is no more than one of it.

## Why?

To give a better description on the userscript and to make sure that there is not
accidentally more than one.

## Options

This rule has a string option:

- `"required"` (default) requires that the description attribute is present
- `"optional"` makes the description attribute optional

## Examples

## `"required"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-description: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-description: "error" */

// ==UserScript==
// @name         Deletes the X Button
// ==/UserScript==
```

```js
/* eslint userscripts/require-description: "error" */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// @description  And more stuff
// ==/UserScript==
```

## `"optional"`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/require-description: ["error", "optional"] */

// ==UserScript==
// @name         Deletes the X Button
// ==/UserScript==
```

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/require-description: ["error", "optional"] */

// ==UserScript==
// @name         Deletes the X Button
// @description  Some info on my userscript
// @description  And more stuff
// ==/UserScript==
```

## When Not to Use It

This rule should apply to all userscripts which want to be descriptive about what
they do.
