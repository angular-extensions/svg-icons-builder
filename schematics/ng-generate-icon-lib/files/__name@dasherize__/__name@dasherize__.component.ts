import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {<%= iconInterface %>} from '<%= iconImportPath %>';

import {<%= capitalize(camelize(name)) %>Registry} from './<%= dasherize(name) %>-registry.service';

@Component({
    selector: '<%= dasherize(name) %>',
    template: `
        <ng-content></ng-content>
    `,
    styles: [':host::ng-deep svg{width: <%= defaultIconSize %>px; height: <%= defaultIconSize %>px}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= capitalize(camelize(name)) %>Component {
    private svgIcon: SVGElement;

    @Input()
    set name(iconName: <%= iconInterface %>) {
        if (this.svgIcon) {
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.<%= camelize(name) %>Registry.getIcon(iconName);
        this.svgIcon = this.svgElementFromString(svgData);
        this.element.nativeElement.appendChild(this.svgIcon);
    }

    constructor(private element: ElementRef, private <%= camelize(name) %>Registry: <%= capitalize(camelize(name)) %>Registry,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}
