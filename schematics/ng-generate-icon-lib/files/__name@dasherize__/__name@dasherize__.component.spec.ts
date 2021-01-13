import {<%= capitalize(camelize(name)) %>Component} from './<%= dasherize(name) %>.component';

describe('<%= capitalize(camelize(name)) %>Component', () => {

    let sut;

    const elementMock = {
        nativeElement: {
            removeChild: jasmine.createSpy(),
            appendChild: jasmine.createSpy()
        }
    };

    const iconRegistryMock = {
        getIcon: jasmine.createSpy()
    } as any;

    beforeEach(() => sut = new <%= capitalize(camelize(name)) %>Component(elementMock, iconRegistryMock, document));

    it('should append an SVG element to the ElementRef', () => {
        const iconName = 'my-awesome-icon';
        const svgData = '<svg>some svg content</svg>';
        const div = document.createElement('DIV');
        div.innerHTML = svgData;

        iconRegistryMock.getIcon.and.callFake((name) => name === iconName ? svgData : null);

        sut.name = iconName;
        expect(elementMock.nativeElement.appendChild).toHaveBeenCalledWith(div.querySelector('svg'));
    });

    it('should remove the previous element if we want to append a new one', () => {
        const iconName = 'my-awesome-icon';
        const svgData = '<svg>some svg content</svg>';
        const div = document.createElement('DIV');
        div.innerHTML = svgData;

        iconRegistryMock.getIcon.and.callFake((name) => name === iconName ? svgData : null);

        sut.name = iconName;
        expect(elementMock.nativeElement.appendChild).toHaveBeenCalledWith(div.querySelector('svg'));

        sut.name = 'anotherIcon';
        expect(elementMock.nativeElement.removeChild).toHaveBeenCalled();
    });
});
