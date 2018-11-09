import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../Icon';
import ShallowDropDownHeader, {ShallowDropDownHeaderProps, defaultProps} from './header';

describe('<ShallowDropDownHeader/>', () => {
    const props: ShallowDropDownHeaderProps = {
        ...defaultProps,
        children: 'Foo children',
        isOpen: false,
        toggleDropDown: () => null,
        theme: {
            'dropDown__btn': 'baseDropDownHeaderClassName',
            'dropDown__btnLabel': 'baseDropDownHeaderLabelClassName',
            'dropDown__chevron': 'baseDropDownHeaderChevronClassName',
            'dropDown__btn--withChevron': 'baseDropDownHeaderWithChevronClassName',
         }
    };

    it('should render correctly.', () => {
        const wrapper = shallow(<ShallowDropDownHeader {...props}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should allow the propagation of "className" with the "className" prop.', () => {
        const wrapper = shallow(<ShallowDropDownHeader {...props} className="fooClassName"/>);

        expect(wrapper.prop('className')).toContain('fooClassName');
    });

    it('should call the "toggleDropDown" prop when clicking on the wrapper.', () => {
        const toggleDropDown = jest.fn();
        const wrapper = shallow(<ShallowDropDownHeader {...props} toggleDropDown={toggleDropDown}/>);

        wrapper.simulate('click');

        expect(toggleDropDown.mock.calls.length).toBe(1);
    });

    it('should render a node with a aria-haspopup attribute if the "isOpen" prop is falsy.', () => {
        const wrapper = shallow(<ShallowDropDownHeader {...props} isOpen={false}/>);

        expect(wrapper.html().includes('aria-haspopup')).toBeTruthy();
    });

    it('should render the passed "Icon" with the themes "dropDown__chevron" className and a "chevron-down" icon prop.', () => {
        const wrapper = shallow(<ShallowDropDownHeader {...props}/>);
        const icon = wrapper.find(Icon);

        expect(icon.hasClass('baseDropDownHeaderChevronClassName')).toBeTruthy();
        expect(icon.prop('icon')).toBe('chevron-down');
    });

    it('should render the passed "Icon" with a "chevron-up" icon prop in case the "isOpen" prop is truthy.', () => {
        const wrapper = shallow(<ShallowDropDownHeader {...props} isOpen/>);
        const icon = wrapper.find(Icon);

        expect(icon.hasClass('baseDropDownHeaderChevronClassName')).toBeTruthy();
        expect(icon.prop('icon')).toBe('chevron-up');
    });
});
