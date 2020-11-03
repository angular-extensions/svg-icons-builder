import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { ConstantsConversionOptions, ConversionType, convertToConstants, mergeWithDefaults } from 'svg-to-ts';

interface Options extends ConstantsConversionOptions {}

// Using `Options & JsonObject` instead of extending JsonObject because of optional boolean
export default createBuilder<Options & JsonObject>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    try {
      if (options.conversionType !== ConversionType.CONSTANTS) {
        reject(new Error(`This builder only supports '${ConversionType.CONSTANTS}' conversionType.`));
      }

      const conversionOptions = await mergeWithDefaults(options);
      context.logger.info('We are using the conversion type "constants"');
      await convertToConstants((conversionOptions as unknown) as ConstantsConversionOptions);

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
