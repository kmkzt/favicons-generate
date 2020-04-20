import { dirname, resolve } from 'path';
import { program } from 'commander';
import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';
import { generate } from './generate';
import { __VERSION__, __DEV__, PKG } from './constants';
const explorer = cosmiconfig('favicon');

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
  .usage('--input ./example.svg --output ./favicons')
  .action(argv => {
    /**
     * Cli Parameter (Override Path)
     */
    const overrideFaviconImage = argv.input
      ? resolve(process.cwd(), argv.input)
      : undefined;
    const overrideOutputPath = argv.output
      ? resolve(process.cwd(), argv.output)
      : undefined;
    const overrideTemplatePath = argv.template
      ? resolve(process.cwd(), argv.template)
      : undefined;

    /**
     * Configuration perser
     */
    explorer
      .search()
      .then((result: CosmiconfigResult) => {
        if (__DEV__) {
          console.log('overrideFaviconImage: ', overrideFaviconImage);
          console.log('overrideOutputPath: ', overrideOutputPath);
          console.log('overrideTemplatePath: ', overrideTemplatePath);
          console.log('config: ', result);
          console.log('config path:', result && dirname(result.filepath));
        }

        /**
         * Config parameter format
         */
        const configPath: string | undefined =
          result && result.filepath ? dirname(result.filepath) : undefined;
        const faviconImage: string | undefined =
          configPath && result && result.config.input
            ? resolve(configPath, result.config.input)
            : undefined;
        const outputPath: string | undefined =
          configPath && result && result.config.output
            ? resolve(configPath, result.config.output)
            : undefined;
        const templatePath: string | undefined =
          configPath && result && result.config.template
            ? resolve(configPath, result.config.template)
            : undefined;

        /**
         * Check Parameter
         */
        const input: string | undefined = overrideFaviconImage || faviconImage;
        if (!input) {
          throw 'required favicon image.';
        }
        const output: string | undefined = overrideOutputPath || outputPath;
        if (!output) {
          throw 'required output path.';
        }

        /**
         * generate favicons
         */
        generate({
          input,
          output,
          template: overrideTemplatePath || templatePath,
          config: result ? result.config.config : undefined,
        });
      })
      .catch(error => {
        // Do something constructive.
        console.error(error);
      });
  });

program.parse(process.argv);
