# `eslint-plugin-userscripts`

Implements rules for userscripts in `eslint`.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```shell
npm install eslint --save-dev
```

Next, install `eslint-plugin-userscripts`:

```shell
npm install eslint-plugin-userscripts --save-dev
```

## Usage in legacy config

Add `userscripts` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "extends": ["plugin:userscripts/recommended"]
}
```

## Usage in recent flat config

Add an element to the config array in your `eslint.config.*` file :

```js
const userscripts = require('eslint-plugin-userscripts');

module.exports = [
  // other configs
  {
    files: ['*.user.js'],
    plugins: {
      userscripts: {
        rules: userscripts.rules
      }
    },
    rules: {
      ...userscripts.configs.recommended.rules
    },
    settings: {
      userscriptVersions: {
        violentmonkey: '*'
      }
    }
  }
];
```

## Supported Rules

| Rule                                                                             | Description                                                            | Recommended |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | :---------: |
| [`filename-user`](docs/rules/filename-user.md)                                   | Ensures userscripts end with .user.js                                  |     ✅      |
| [`no-invalid-grant`](docs/rules/no-invalid-grant.md)                             | Ensures the argument passed to `@grant` is valid                       |     ✅      |
| [`no-invalid-metadata`](docs/rules/no-invalid-metadata.md)                       | Ensures userscripts have valid metadata                                |     ✅      |
| [`require-name`](docs/rules/require-name.md)                                     | Ensures userscripts have a name                                        |     ✅      |
| [`require-description`](docs/rules/require-description.md)                       | Ensures userscripts have a description                                 |     ✅      |
| [`require-version`](docs/rules/require-version.md)                               | Ensures userscripts have a valid version                               |     ✅      |
| [`use-homepage-and-url`](docs/rules/use-homepage-and-url.md)                     | Ensures that for each `homepage` attribute, `homepageURL` is also used |     ✅      |
| [`require-download-url`](docs/rules/require-download-url.md)                     | Ensures that for each `downloadURL` there is a `updateURL`             |     ✅      |
| [`align-attributes`](docs/rules/align-attributes.md)                             | Ensures that attributes are spaced out and aligned                     |     ✅      |
| [`require-attribute-space-prefix`](docs/rules/require-attribute-space-prefix.md) | Ensure that attributes are prefixed by one space                       |     ✅      |
| [`metadata-spacing`](docs/rules/metadata-spacing.md)                             | Ensures there is a newline between the metadata and the code           |     ✅      |
| [`no-invalid-headers`](docs/rules/no-invalid-headers.md)                         | Ensures userscripts have valid headers                                 |     ✅      |
| [`compat-grant`](docs/rules/compat-grant.md)                                     | Ensures your `@grant` permissions are supported                        |             |
| [`compat-headers`](docs/rules/compat-headers.md)                                 | Ensures your headers are supported                                     |             |
| [`better-use-match`](docs/rules/better-use-match.md)                             | Prefers `@match` over `@include`                                       |     ✅      |
