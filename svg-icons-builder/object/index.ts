import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { ObjectConversionOptions, convertToSingleObject, mergeWithDefaults } from 'svg-to-ts';

interface Options extends ObjectConversionOptions {
  conversionType: string
}

export default createBuilder<Options>((options: Options, context: BuilderContext) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    try {
      if (options.conversionType !== 'object') {
        reject(new Error(`This builder only supports object conversionType.`));
      }

      const conversionOptions = await mergeWithDefaults(options);
      if (conversionOptions.conversionType === 'object') {
        context.logger.info('We are using the conversion type "object"');
        await convertToSingleObject(conversionOptions);
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
