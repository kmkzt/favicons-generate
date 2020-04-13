import { writeFileSync } from 'fs';
import { extname, dirname } from 'path';
import mkdirp from 'mkdirp';
import favicons, { Configuration, FavIconResponse } from 'favicons';
import { __DEV__ } from './constants';

interface Option {
  input: string;
  output: string;
  template?: string;
  config?: Configuration;
}

export const generate = ({ input, output, template, config }: Option) => {
  console.log(`favicon image: ${input}`);
  console.log(`output path: ${output}`);
  template && console.log(`output template path: ${template}`);
  console.log('...generate favicons.');

  if (__DEV__) {
    console.log(config);
  }
  favicons(input, config, (error, response) => {
    /**
     * Error handling
     */
    if (error) {
      console.error(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    if (__DEV__) {
      console.log(response);
    }

    /**
     * check dirctory
     */
    const checkDir = (dir: string, cb: Function) => {
      mkdirp(dir).then(made => {
        made && console.log(`generate directory: ${made}`);
        cb();
      });
    };
    /**
     * Write favicon image
     */
    checkDir(dirname(output), () => {
      const writeFaviconImage = (
        outputDir: string,
        encoding: 'buffer' | 'utf-8'
      ) => ({
        name,
        contents,
      }: FavIconResponse['images' | 'files'][number]) => {
        const filename = outputDir + '/' + name;
        console.log(`made image: ${filename}`);
        writeFileSync(filename, contents, {
          encoding,
        });
      };
      response.images.map(writeFaviconImage(output, 'buffer'));
      response.files.map(writeFaviconImage(output, 'utf-8'));
    });

    /**
     * Write favicon template
     */
    const templateOutput = template || output;
    checkDir(dirname(templateOutput), () => {
      const formatTemplateOutput = (templatePath: string) =>
        extname(templatePath) === '.html'
          ? templatePath
          : dirname(templatePath) + '/meta.html';
      const templateOutputFile = formatTemplateOutput(templateOutput);
      console.log(`made template: ${templateOutputFile}`);
      writeFileSync(templateOutputFile, response.html.join(''));
    });
  });
};
