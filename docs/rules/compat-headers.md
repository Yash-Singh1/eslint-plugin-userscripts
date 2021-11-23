# `compat-headers`

The `compat-headers` rule verifies that your header declarations are compatible
with your target userscript managers.

## Why?

Ensures that you aren't using declarations that you don't support or don't want
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
  userscript managers support the header used

## Examples

### `requireAllCompatible`: `false`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/compat-headers: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
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
/* eslint userscripts/compat-headers: ["error", { "requireAllCompatible": false }] */

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
    "tampermonkey": ">3.1 <4",
    "greasemonkey": ">4"
  }
}
```

</details>

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/compat-headers: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @name   my script name
// @grant  example.com
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "greasemonkey": ">=4 <4.2" // Greasemonkey removed support for localized names/descriptions in GM4 and readded it in GM4.11
  }
}
```

</details>

```js
/* eslint userscripts/compat-headers: ["error", { "requireAllCompatible": false }] */

// ==UserScript==
// @exclude-match   ...
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": "<4" // `exclude-match` is violentmonkey only
  }
}
```

</details>

### `requireAllCompatible`: `true`

👍 Examples of **correct** code for this rule

```js
/* eslint userscripts/compat-headers: "error" */

// ==UserScript==
// @version   0.0.1
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "*",
    "greasemonkey": ">4"
  }
}
```

</details>

```js
/* eslint userscripts/compat-headers: "error" */

// ==UserScript==
// @run-at context-menu
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "greasemonkey": ">=4.1"
  }
}
```

</details>

👎︎ Examples of **incorrect** code for this rule

```js
/* eslint userscripts/compat-headers: "error" */

// ==UserScript==
// @version   0.0.1
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "*",
    "greasemonkey": "<0.9.0" // GM supports `version` as of 0.9.0
  }
}
```

</details>

```js
/* eslint userscripts/compat-headers: "error" */

// ==UserScript==
// @exclude-match *
// ==/UserScript==
```

<details>
  <summary>Show Settings</summary>

```jsonc
{
  "userscriptVersions": {
    "tampermonkey": ">4.5",
    "violentmonkey": "*"
  }
}
```

</details>

## When Not to Use It

When you are aware of your compatability and/or support a limited number of
userscript managers.
