import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { ConstantsConversionOptions, convertToConstants } from 'svg-to-ts';

interface Options extends ConstantsConversionOptions {
  conversionType: string
}

// Using `Options & JsonObject` instead of extending JsonObject because of optional boolean
export default createBuilder<Options & JsonObject>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    try {
      if (options.conversionType !== 'constants') {
        reject(new Error(`This builder only supports constants conversionType.`));
      }

      context.logger.info('We are using the conversion type "constants"');
      await convertToConstants((options as unknown) as ConstantsConversionOptions);

      resolve({ success: true });
      context.reportStatus(`Done.`);
    } catch (error) {
      context.reportStatus(`Error: ${error.message}`);
      reject(error);
      process.disconnect();
      process.exit(1);
    }
  });
});
