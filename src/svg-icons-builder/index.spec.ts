import { Architect } from "@angular-devkit/architect";
import { TestingArchitectHost } from "@angular-devkit/architect/testing";
import { logging, schema } from "@angular-devkit/core";
import { Delimiter } from "svg-to-ts/src/lib/generators/code-snippet-generators";
import { CommonConversionOptions } from "svg-to-ts/src/lib/options/conversion-options";
const { join } = require("path");

describe("svg-icons-builder", () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;
  const defaultCommonOptions: CommonConversionOptions = {
    srcFiles: ["./dinosaur-icons/icons/**/*.svg"],
    outputDirectory: "./dist/test/dinosaur-icons",
    svgoConfig: {
      plugins: [
        {
          cleanupAttrs: true,
        },
      ],
    },
    delimiter: Delimiter.CAMEL,
  };

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const workspaceRoot = join(__dirname, "..", "..");

    // TestingArchitectHost() takes workspace and current directories.
    // Since we don't use those, both are the same in this case.
    architectHost = new TestingArchitectHost("/root", "/root");
    architect = new Architect(architectHost, registry);

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(workspaceRoot);
    console.log("#", Array.from((architectHost as any)._builderMap.keys()));
  });

  it("generates constants for icons", async () => {
    const logger = new logging.Logger("");
    const logs: string[] = [];
    logger.subscribe((ev) => logs.push(ev.message));

    // A "run" can have multiple outputs, and contains progress information.
    const run = await architect.scheduleBuilder(
      "@angular-extensions/svg-icons-builder:svg-icons-builder",
      {
        ...defaultCommonOptions,
        conversionType: "constants",
        fileName: "dinosaur-icons",
        typeName: "dinosaurIcon",
        generateType: true,
        generateTypeObject: true,
        generateCompleteIconSet: true,
        prefix: "dinosaurIcon",
        interfaceName: "DinosaurIcon",
      },
      { logger }
    ); // We pass the logger for checking later.

    // The "result" member (of type BuilderOutput) is the next output.
    expect(await run.result).toEqual(
      jasmine.objectContaining({
        success: true,
      })
    );

    await run.stop();

    expect(logs).toContain('We are using the conversion type "constants"');
    expect(logs).toContain("svg-to-ts completed.");
  });
});
