import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const svgToTsVersion = '^7.1.0';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    addPackageToPackageJson(tree, 'svg-to-ts', `${svgToTsVersion}`);
    _context.logger.log('info', `Installing added packages...`);
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

export function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.devDependencies) {
      json.devDependencies = {};
    }

    if (!json.devDependencies[pkg]) {
      json.devDependencies[pkg] = version;
      json.devDependencies = sortObjectByKeys(json.devDependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  } else {
    throw new Error(`Cannot find package.json`);
  }

  return host;
}

function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}
