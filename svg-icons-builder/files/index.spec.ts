import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { logging, schema } from '@angular-devkit/core';
import { defaultCommonOptions } from '../test-helpers';
const { join } = require('path');

describe('svg-icons-builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const workspaceRoot = join(__dirname, '..', '..');

    architectHost = new TestingArchitectHost('/root', '/root');
    architect = new Architect(architectHost, registry);

    await architectHost.addBuilderFromPackage(workspaceRoot);
    console.log('#', Array.from((architectHost as any)._builderMap.keys()));
  });

  it('generates `files` for icons', async () => {
    const logger = new logging.Logger('');
    const logs: string[] = [];
    logger.subscribe((ev) => logs.push(ev.message));

    const run = await architect.scheduleBuilder(
      '@angular-extensions/svg-icons-builder:svg-icons-files-builder',
      {
        ...defaultCommonOptions(),
        conversionType: 'files',
        typeName: 'dinosaurIcon',
        generateType: true,
        generateTypeObject: true,
        exportCompleteIconSet: true,
        prefix: 'dinosaurIcon',
        interfaceName: 'DinosaurIcon',
        modelFileName: 'dinosaur-icons.model',
        iconsFolderName: 'build',
        compileSources: true,
        barrelFileName: 'index',
      },
      { logger }
    );

    expect(await run.result).toEqual(
      expect.objectContaining({
        success: true,
      })
    );

    await run.stop();

    expect(logs).toContain('We are using the conversion type "files"');
  });
});
