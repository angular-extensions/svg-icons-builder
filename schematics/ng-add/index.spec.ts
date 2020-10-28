import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);

describe('ng-add', () => {
  it('works', async () => {
    const tree = await runner.runSchematicAsync('ng-add', {}, Tree.empty()).toPromise();

    expect(tree.files).toEqual([]);
  });
});
