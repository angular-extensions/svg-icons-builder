# svg-icons-builder (WIP - not yet available on npm)

The svg-icons-builder is a Angular builder for the [svg-to-ts](https://github.com/kreuzerk/svg-to-ts) project. It can be used to convert SVG icons inside an Angular library or SPA to an object, to constants or even to individual TypeScript or JavaScript files.
Find out more on the official [svg-to-ts docs](https://github.com/kreuzerk/svg-to-ts).

## Usage

### Configuring the builder

To use the builder you need to add a new entry to your `architect` object inside your `angular.json`. In our example we call it `generate-icons`. You then need to specify the following properties:

- **Builder**: `"@angular-extensions/svg-icons-builder:svg-icons-builder"`
- **Config**: A valid [svg-to-ts configuration](https://github.com/kreuzerk/svg-to-ts). ⚠️ the options depend on the `conversionType` and may therefore vary. Means, a configuration for the `convesionType: "files"` will look different than configuration for the `conversionType: "constants"`

```json
"generate-icons": {
  "builder": "@angular-extensions/svg-icons-builder:svg-icons-builder",
  "options": {
    "conversionType": "constants",
    "srcFiles": ["./src/icons/*.svg"],
    "outputDirectory": "./projects/dinosaur-icons/icons",
    "interfaceName": "DinosaurIcon",
    "typeName": "dinosaurIcon",
    "prefix": "dinosaurIcon",
    "modelFileName": "dinosaur-icon.model",
    "svgoConfig": {
      "plugins": [
        {
          "cleanupAttrs": true
        }
      ]
    },
    "additionalModelFile": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

### Run the builder

In order to run the builder you have to add a new npm script to your `package.json`. Replace `name-of-your-app` with the name of your application 😉.

```json
"genrate-icons": "ng run name-of-your-app:generate-icons"
```
