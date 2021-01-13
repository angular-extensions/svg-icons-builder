import {<%= capitalize(camelize(name)) %>Registry} from './<%= dasherize(name) %>-registry.service';

describe('<%= capitalize(camelize(name)) %>Registry', () => {
    let sut: <%=capitalize(camelize(name)) %>Registry;

    beforeEach(() => (sut = new <%=capitalize(camelize(name)) %>Registry()));

    it('should add icons to the registry', () => {
        const iconName = 'someicon' as any;
        const iconData = 'some data' as any;
        const someIcon = { name: iconName, data: iconData };

        sut.registerIcons([someIcon]);
        expect(sut.getIcon(iconName)).toEqual(iconData);
    });

    it('should add multiple icons to the registry', () => {
        const iconOneName = 'barIcon' as any;
        const iconTwoName = 'fooIcon' as any;
        const iconOneData = 'iconOneData';
        const iconTwoData = 'iconTwoData';
        const iconOne = { name: iconOneName, data: iconOneData };
        const iconTwo = { name: iconTwoName, data: iconTwoData };

        sut.registerIcons([iconOne, iconTwo]);
        expect(sut.getIcon(iconOneName)).toEqual(iconOneData);
        expect(sut.getIcon(iconTwoName)).toEqual(iconTwoData);
    });

    it('should print a warning if an icon is not in the registry', () => {
        spyOn(console, 'warn');
        const iconName = 'someIcon' as any;
        sut.getIcon(iconName);
        expect(console.warn).toHaveBeenCalledWith(
            `👀 we could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`
        );
    });
});
