import { program } from 'commander';
import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';
import { generate } from './generate';
import { __VERSION__, __DEV__, PKG } from './constants';
const explorer = cosmiconfig('favicon');

/**
 *
 */
program
  .name(PKG)
  .version(__VERSION__, '-v, --version', 'output the current version')
  .option(
    '-i, --input <input>',
    'Input favicons resource. example: --input ./favicon.png'
  )
  .option(
    '-o, --output <output>',
    'Output favicons path. example: --output ./favicon'
  )
  .option(
    '-t, --template <template>',
    'Output template path. example: --template ./template'
  )
  .usage('--input favicons.svg')
  .usage('--output ./facvicons')
  .action(({ input, output, template }) => {
    /**
     * Configuration perser
     */
    explorer
      .search()
      .then((result: CosmiconfigResult) => {
        if (__DEV__) {
          console.log('input', input);
          console.log('output', output);
          console.log('template', template);
          console.log('config', result);
        }

        // result.config is the parsed configuration object.
        // result.filepath is the path to the config file that was found.
        // result.isEmpty is true if there was nothing to parse in the config file.
        const faviconImage = input || result?.config.input;
        const outputPath = output || result?.config.output;
        const templatePath = template || result?.config.template;

        if (!faviconImage) {
          throw 'required favicon image.'
        }

        if (!outputPath) {
          throw 'required output path'
        }

        generate({
          ...(result?.config || {}),
          input: faviconImage,
          output: outputPath,
          template: templatePath,
        });
      })
      .catch(error => {
        // Do something constructive.
        console.log('error', error);
      });
  });

program.parse(process.argv);
