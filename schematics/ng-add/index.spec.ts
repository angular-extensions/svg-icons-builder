import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);

describe('ng-add', () => {
  let appTree: UnitTestTree;

  beforeEach(() => {
    appTree = new UnitTestTree(Tree.empty());
    appTree.create('/package.json', JSON.stringify({ devDependencies: {} }));
  });

  it('should update package.json', async () => {
    const tree = await runner.runSchematicAsync('ng-add', { preserveAngularCLILayout: true }, appTree).toPromise();

    const result = JSON.parse(tree.readContent('/package.json')).devDependencies;
    expect(result['svg-to-ts']).toBeDefined();
  });

  it('should error if no package.json is present', async () => {
    appTree.delete('package.json');
    try {
      await runner.runSchematicAsync('ng-add', { name: 'myApp' }, appTree).toPromise();
      fail('should throw');
    } catch (e) {
      expect(e.message).toContain('Cannot find package.json');
    }
  });
});
