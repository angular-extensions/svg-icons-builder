import { Injectable } from '@angular/core';

import { <%= iconType %>, <%= iconInterface %>} from '<%= iconImportPath %>';

@Injectable({
    providedIn: 'any'
})
export class <%= capitalize(camelize(name)) %>Registry {
    private registry = new Map<<%= iconType %>, string>();

    public registerIcons(icons: <%= iconInterface %>[]): void {
        icons.forEach((icon: any) => this.registry.set(icon.name, icon.data));
    }

    public getIcon(iconName: <%= iconType %>): string | undefined {
        if (!this.registry.has(iconName)) {
            console.warn(
                `👀 we could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`
            );
        }
        return this.registry.get(iconName);
    }
}
