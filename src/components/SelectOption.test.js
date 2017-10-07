
import React from 'react';
import SelectOption from './SelectOption';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// For react v16, enzyme need this Adaptor so far.
configure({ adapter: new Adapter() });

describe('<SelectOption />', () => {
  it('should render', () => {
    const wrapper = shallow(<SelectOption value="testname"/>);
    assert(wrapper.find('option').length === 1);
  });

});

