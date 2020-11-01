import { CommonConversionOptions } from 'svg-to-ts';
import { Delimiter } from 'svg-to-ts/src/lib/generators/code-snippet-generators';

export const defaultCommonOptions = (): CommonConversionOptions => ({
  srcFiles: ['./dinosaur-icons/icons/**/*.svg'],
  outputDirectory: './dist/test/dinosaur-icons',
  svgoConfig: {
    plugins: [
      {
        cleanupAttrs: true,
      },
    ],
  },
  delimiter: Delimiter.CAMEL,
});
