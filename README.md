# svg-icons-builder

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

The svg-icons-builder is a Angular builder for the [svg-to-ts](https://github.com/kreuzerk/svg-to-ts) project. It can be used to convert SVG icons inside an Angular library or SPA to an object, to constants or even to individual TypeScript or JavaScript files.
Find out more on the official [svg-to-ts docs](https://github.com/kreuzerk/svg-to-ts).

## Usage

### Installation

NPM: `npm install @angular-extensions/svg-icons-builder`

Angular CLI: `ng add @angular-extensions/svg-icons-builder`

### Configure the builder

To use the builder you need to add a new entry to your `architect` object inside your `angular.json`.

A valid [svg-to-ts configuration](https://github.com/kreuzerk/svg-to-ts). ⚠️ the options depend on the `conversionType` and may therefore vary. Means, a configuration for the `convesionType: "files"` will look different than configuration for the `conversionType: "constants"`. Each `conversionType` has it's own builder.

In our example we call it `generate-icons`. You then need to specify the following properties:

## `conversionType: constants`

- **Builder**: `"@angular-extensions/svg-icons-builder:svg-icons-constants-builder"`
- **Config**: [svg-to-ts constants config](https://github.com/kreuzerk/svg-to-ts#2-multiple-constants---treeshakable-and-typesafe-with-one-file-conversiontypeconstants)

```json
"generate-icons": {
  "builder": "@angular-extensions/svg-icons-builder:svg-icons-constants-builder",
  "options": {
      "conversionType": "constants",
      "fileName": "myIcons",
      "generateType": false,
      "generateTypeObject": false,
      "generateCompleteIconSet": true,
      "srcFiles": ["./src/icons/*.svg"],
      "outputDirectory": "./dist/icons",
      "interfaceName": "DinosaurIcon",
      "typeName": "dinosaurIcon",
      "prefix": "dinosaurIcon",
      "svgoConfig": {
        "plugins": ["cleanupAttrs"]
      }
  }
}
```

## `conversionType: files`

- **Builder**: `"@angular-extensions/svg-icons-builder:svg-icons-files-builder"`
- **Config**: [svg-to-ts files config](https://github.com/kreuzerk/svg-to-ts#3-tree-shakable-and-optimized-for-lazy-loading-conversiontypefiles)

```json
  "generate-icons": {
    "builder": "@angular-extensions/svg-icons-builder:svg-icons-files-builder",
    "options": {
      "conversionType": "files",
      "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
      "outputDirectory": "./dist/dinosaur-icons/icons",
      "interfaceName": "DinosaurIcon",
      "generateType": false,
      "generateTypeObject": false,
      "generateCompleteIconSet": false,
      "exportCompleteIconSet": false,
      "fileName": "dinosaur-icons",
      "iconsFolderName": "dinosaur-icons",
      "objectName": "dinosaur-icons",
      "typeName": "dinosaurIcon",
      "prefix": "dinosaurIcon",
      "modelFileName": "dinosaur-icons",
      "barrelFileName": "index",
      "svgoConfig": {
        "plugins": ["cleanupAttrs"]
      },
      "compileSources": true
    }
  }
```

## `conversionType: object`

- **Builder**: `"@angular-extensions/svg-icons-builder:svg-icons-object-builder"`
- **Config**: [svg-to-ts object config](https://github.com/kreuzerk/svg-to-ts#1-converting-to-a-single-object-conversiontypeobject)

```json
  "generate-icons": {
    "builder": "@angular-extensions/svg-icons-builder:svg-icons-object-builder",
    "options": {
      "conversionType": "object",
      "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
      "outputDirectory": "./dist/dinosaur-icons/icons",
      "fileName": "dinosaur-icons",
      "objectName": "dinosaur-icons",
      "svgoConfig": {
        "plugins": ["cleanupAttrs"]
      },
      "compileSources": true
    }
  }
```

### Run the builder

In order to run the builder you have to add a new npm script to your `package.json`. Replace `name-of-your-app` with the name of your application 😉.

```json
"genrate-icons": "ng run name-of-your-app:generate-icons"
```

## Core Team ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.kaylaaltepeter.com/"><img src="https://avatars1.githubusercontent.com/u/5103752?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kayla Altepeter</b></sub></a><br /><a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kaltepeter" title="Code">💻</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/issues?q=author%3Akaltepeter" title="Bug reports">🐛</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kaltepeter" title="Documentation">📖</a> <a href="#ideas-kaltepeter" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kaltepeter" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://medium.com/@kevinkreuzer"><img src="https://avatars0.githubusercontent.com/u/5468954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kevin Kreuzer</b></sub></a><br /><a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kreuzerk" title="Code">💻</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/issues?q=author%3Akreuzerk" title="Bug reports">🐛</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kreuzerk" title="Documentation">📖</a> <a href="#ideas-kreuzerk" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/@angular-extensions/@angular-extensions/svg-icons-builder/commits?author=kreuzerk" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
