import { BuilderOutput, createBuilder } from "@angular-devkit/architect";
import { JsonObject } from "@angular-devkit/core";
import { fork } from "child_process";
import { join } from "path";
import { ConstantsConversionOptions } from "svg-to-ts/src/lib/options/conversion-options";

interface Options extends ConstantsConversionOptions, JsonObject {
  generateCompleteIconSet: boolean; // TODO: should this be exportCompleteIconSet
}

export default createBuilder<Options>((options, context) => {
  context.logger.info(`Options: ${options}`);
  return new Promise<BuilderOutput>((resolve, reject) => {
    const child = fork(join(__dirname, `/svg-to-ts-wrapper.ts`), [], {
      stdio: [0, 1, 2, "ipc"],
    });
    child.send(options);
    child.on("message", ({ isError, data }) => {
      if (isError) {
        context.logger.error(data);
        child.kill("SIGINT");
        reject();
      }
      context.logger.info(data);
    });
    child.on("exit", (code) => {
      resolve({ success: code === 0 });
    });
    child.on("error", (err) => {
      context.logger.error(err.toString());
      reject();
    });
    context.reportStatus(`Done.`);
  });
});
