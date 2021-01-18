import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= capitalize(camelize(name)) %>Component } from './<%= dasherize(name) %>.component';

@NgModule({
    declarations: [<%= capitalize(camelize(name)) %>Component],
    exports: [<%= capitalize(camelize(name)) %>Component],
    imports: [CommonModule]
})
export class <%= capitalize(camelize(name)) %>Module {}
