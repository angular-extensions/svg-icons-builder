import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import {
  CommonConversionOptions,
  ConstantsConversionOptions,
  ConversionType,
  FileConversionOptions,
  ObjectConversionOptions,
  convertToFiles,
  convertToConstants,
  convertToSingleObject,
  mergeWithDefaults,
} from 'svg-to-ts';

interface Options extends CommonConversionOptions, JsonObject {}

export default createBuilder<Options>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    try {
      if (!options.conversionType) {
        reject();
      }

      const conversionOptions = await mergeWithDefaults(options);
      if (conversionOptions.conversionType === ConversionType.FILES) {
        context.logger.info('We are using the conversion type "files"');
        await convertToFiles((conversionOptions as unknown) as FileConversionOptions);
      }

      if (conversionOptions.conversionType === ConversionType.CONSTANTS) {
        context.logger.info('We are using the conversion type "constants"');
        await convertToConstants((conversionOptions as unknown) as ConstantsConversionOptions);
      }

      if (conversionOptions.conversionType === ConversionType.OBJECT) {
        context.logger.info('We are using the conversion type "object"');
        await convertToSingleObject((conversionOptions as unknown) as ObjectConversionOptions);
      }

      resolve({ success: true });
      context.reportStatus(`Done.`);
    } catch (error) {
      context.reportStatus('Error');
      process.disconnect();
      process.exit(1);
    }
  });
});
