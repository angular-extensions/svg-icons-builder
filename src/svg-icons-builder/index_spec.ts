import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { logging, schema } from '@angular-devkit/core';
const { join } = require('path');

describe('svg-icons-builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const workspaceRoot = join(__dirname, '..', '..');

    // TestingArchitectHost() takes workspace and current directories.
    // Since we don't use those, both are the same in this case.
    architectHost = new TestingArchitectHost(__dirname, __dirname);
    architect = new Architect(architectHost, registry);

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(workspaceRoot);
   console.log('#', Array.from((architectHost as any)._builderMap.keys()))
  });

  it('works', async () => {
    const logger = new logging.Logger('');
    const logs: string[] = [];
    logger.subscribe(ev => logs.push(ev.message));

    // A "run" can have multiple outputs, and contains progress information.
    const run = await architect.scheduleBuilder('@angular-extensions/svg-icons-builder:svg-icons-builder', {
      command: 'node',
      args: ['--print', '\'foo\''],
    }, { logger });  // We pass the logger for checking later.

    // The "result" member (of type BuilderOutput) is the next output.
    await run.result;

    // Stop the builder from running. This stops Architect from keeping
    // the builder-associated states in memory, since builders keep waiting
    // to be scheduled.
    await run.stop();

    // Expect that foo was logged
    expect(logs).toContain('foo');
  });
});
