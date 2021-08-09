import {
  url,
  move,
  apply,
  chain,
  template,
  mergeWith,
  Tree,
  Rule,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function generateIconLibrary(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceAsBuffer = tree.read('angular.json');
    if (!workspaceAsBuffer) {
      throw new SchematicsException('Not and Angular CLI workspace');
    }

    const workspace = JSON.parse(workspaceAsBuffer.toString());

    const projectName = options.project || workspace.defaultProject;
    const project = workspace.projects[projectName];

    if (project.projectType === 'application') {
      throw new SchematicsException(
        'The "generateLibrary" schematics works only for the "library" projects, please specify correct project using --project flag'
      );
    }

    const path = options.path || `${project.sourceRoot}/lib`;
    const parsed = parseName(path, options.name);
    options.name = parsed.name;
    const sourceTemplate = url('./files');

    const sourceTemplateParametrized = apply(sourceTemplate, [
      template({
        ...options,
        ...strings,
      }),
      move(parsed.path),
    ]);

    const rules = [mergeWith(sourceTemplateParametrized)];

    if (options.installLibrary) {
      _context.addTask(
        new NodePackageInstallTask({
          packageName: options.iconImportPath,
        })
      );
    }
    return chain(rules);
  };
}
