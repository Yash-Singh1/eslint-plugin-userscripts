# `compat-grant`

The `compat-grant` rule verifies that your `@grant` declarations are compatible
with your target userscript managers.

## Why?

Ensures that you aren't using permissions that you don't support or don't want
to support.

## Settings

This rule looks for your [settings provided](https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings)
in the eslintrc.

The settings must contain a `userscriptVersions` property with the keys of `tampermonkey`,
`greasemonkey`, `violentmonkey` (you can exclude some of them if you don't
support them) with their values being semver [version constraints](https://github.com/npm/node-semver#ranges).

## Options

This rule has an object option with the following properties:

- `"requireAllCompatible"` (default: `false`) requires that all configured
  userscript managers support the grant permission used

## Examples

### `requireAllCompatible`: `false`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/compat-grant: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @grant         GM.openInTab
// @grant         GM_openInTab
// @downloadURL   example.com
// ==/UserScript==

/* My code adapted for async and sync openInTab */
```

<details>
  <summary>Show Settings</summary>

```json
{
  "userscriptVersions": {
    "tampermonkey": ">3 <4",
    "greasemonkey": ">4"
  }
}
```

</details>

```js
/* eslint userscripts/compat-grant: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @grant      unsafeWindow
// @grant      GM.listValues
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```json
{
  "userscriptVersions": {
    "tampermonkey": ">3 <4",
    "greasemonkey": ">4"
  }
}
```

</details>

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/compat-grant: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @name   my script name
// @grant  example.com
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```json
{
  "userscriptVersions": {
    "tampermonkey": ">3 <4",
    "greasemonkey": ">4"
  }
}
```

</details>

```js
/* eslint userscripts/compat-grant: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @grant   GM.getValue
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": "<4" // GM.* is only supported 4.5 and above for tampermonkey
  }
}
```

</details>

### `requireAllCompatible`: `true`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/compat-grant: "error" */

// ==UserScript==
// @grant   GM.getValue
// @grant   GM.deleteValue
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "*",
    "greasemonkey": ">=4.1"
  }
}
```

</details>

```js
/* eslint userscripts/compat-grant: ["error", 3] */

// ==UserScript==
// @grant GM.log
// @grant  GM_log
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "*",
    "greasemonkey": ">=4.1"
  }
}
```

</details>

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/compat-grant: ["error", 3] */

// ==UserScript==
// @grant      GM.log
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "<=2.13.0", // As of 2.13.0, GM.log is not supported
    "greasemonkey": ">=4.1"
  }
}
```

</details>

```js
/* eslint userscripts/compat-grant: ["error", 3] */

// ==UserScript==
// @grant   GM_webRequest
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5", // GM_webRequest is TamperMonkey specific
    "violentmonkey": "<=2.13.0",
    "greasemonkey": ">=4.1"
  }
}
```

</details>

## When Not to Use It

When you are aware of your compatability and/or support a limited number of
userscript managers.
