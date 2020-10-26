import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
/*
 TODO - we should export this from svg-to-ts - otherwise we rely on internals and it would break if
 we refactor something in svg-to-ts
 */
import {
  CommonConversionOptions,
  ConstantsConversionOptions,
  ConversionType,
  FileConversionOptions,
  ObjectConversionOptions,
} from 'svg-to-ts/src/lib/options/conversion-options';
import { convertToFiles } from 'svg-to-ts/src/lib/converters/files.converter';
import { convertToConstants } from 'svg-to-ts/src/lib/converters/constants.converter';
import { convertToSingleObject } from 'svg-to-ts/src/lib/converters/object.converter';

interface Options extends CommonConversionOptions, JsonObject {
  generateCompleteIconSet: boolean; // TODO: should this be exportCompleteIconSet
}

export default createBuilder<Options>((conversionOptions: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    try {
      if (!conversionOptions) {
        reject();
      }

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

      resolve();
      context.reportStatus(`Done.`);
      process.disconnect();
      process.exit(0);
    } catch (error) {
      process.disconnect();
      process.exit(1);
    }
  });
});
