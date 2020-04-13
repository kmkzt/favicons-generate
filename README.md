# favicons-generate
[![npm version](https://badge.fury.io/js/favicons-generate.svg)](https://www.npmjs.com/package/favicons-generate) [![npm](https://img.shields.io/npm/dt/favicons-generate.svg)](https://www.npmjs.com/package/favicons-generate)

This library is a CLI for generating favicons using [favicons](https://github.com/itgalaxy/favicons)

## Install

```shell
npm i -g favicons-generate
```

## usage

```shell
$ favicons-generate -h

Usage: favicons-generate --input ./example.svg --output ./favicons

Options:
  -v, --version              output the current version
  -i, --input <input>        Input favicons resource. example: --input ./favicon.png
  -o, --output <output>      Output favicons path. example: --output ./favicon
  -t, --template <template>  Output template path. example: --template ./template
  -h, --help                 display help for command
```

## Option

You can change the settings by placing the following files (`package.json`, `.faviconrc.js`, `.faviconrc`, `favicon.config.js`).

```js
// favicon.config.js
module.exports = {
  input: './example.svg', // Required. override cli options.
  output: './favicons', // Required. override cli options.
  template: './template/meta.html', // Default is the same as output, default name is meta.html.
  config: {
    // The options are the same as https://github.com/itgalaxy/favicons#usage
  },
};
```
