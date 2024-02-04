import { Delimiter } from 'svg-to-ts/src/lib/generators/code-snippet-generators';

export const defaultCommonOptions = () => ({
  srcFiles: ['./dinosaur-icons/icons/**/*.svg'],
  outputDirectory: './dist/test/dinosaur-icons',
  delimiter: Delimiter.CAMEL,
  verbose: false,
  svgoConfig: {
    plugins: ['cleanupAttrs'],
  },
});
