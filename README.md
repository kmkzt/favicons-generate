# favicons-generate

A library that generates favicons using [favicons](https://github.com/itgalaxy/favicons)

## Install

```shell
npm i -g favicons-generate
```

## usage

```shell
$ favicons-generate

Usage: favicons-generate --output ./facvicons

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
  template: './template', // Default is the same as output
  config: {
    // The options are the same as https://github.com/itgalaxy/favicons#usage
  },
};
```
