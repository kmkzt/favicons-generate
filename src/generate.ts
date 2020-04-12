import { writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import favicons, { Configuration } from 'favicons';

interface Option {
  input: string;
  output: string;
  template?: string;
  config?: Configuration;
}

/**
 * TODO: Separate callback
 */
export const generate = ({ input, output, template, config }: Option) =>
  favicons(input, config, (error, response) => {
    if (error) {
      console.error(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(response);
    }
    const writePath = (name: string) => output + '/' + name;
    mkdirp(output).then(made => {
      console.log(`made directory: ${made}`);
      response.images.map(({ name, contents }) => {
        console.log(writePath(name));
        writeFileSync(writePath(name), contents, {
          encoding: 'buffer',
        });
      });
      response.files.map(({ name, contents }) => {
        console.log(writePath(name));
        writeFileSync(writePath(name), contents, {
          encoding: 'utf-8',
        });
      });
    });
    const templateOutput = template || output;
    mkdirp(templateOutput).then(made => {
      console.log(`made directory: ${made}`);
      writeFileSync(templateOutput + '/meta.html', response.html.join(''));
    });
  });
