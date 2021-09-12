# `eslint-plugin-userscripts`

Implements rules for userscripts metadata in eslint

## Installation

You'll first need to install [ESLint](http://eslint.org):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-userscripts`:

```sh
npm install eslint-plugin-userscripts --save-dev
```

## Usage

Add `userscripts` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "extends": ["plugin:userscripts/recommended"]
}
```

## Supported Rules

| Rule                                                                       | Description                                                            | Recommended |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- | :---------: |
| [`filename-user`](docs/rules/filename-user.md)                             | Ensures userscripts end with .user.js                                  |     ✅      |
| [`no-invalid-metadata`](docs/rules/no-invalid-metadata.md)                 | Ensures userscripts have valid metadata                                |     ✅      |
| [`require-name`](docs/rules/require-name.md)                               | Ensures userscripts have a name                                        |     ✅      |
| [`require-description`](docs/rules/require-description.md)                 | Ensures userscripts have a description                                 |     ✅      |
| [`require-version`](docs/rules/require-version.md)                         | Ensures userscripts have a valid version                               |     ✅      |
| [`use-homepage-and-url`](docs/rules/use-homepage-and-url.md)               | Ensures that for each `homepage` attribute, `homepageURL` is also used |     ✅      |
| [`use-download-and-update-url`](docs/rules/use-download-and-update-url.md) | Ensures that for each `downloadURL` there is a `updateURL`             |     ✅      |
| [`align-attributes`](docs/rules/align-attributes.md)                       | Ensures that attributes are spaced out and aligned                     |     ✅      |
