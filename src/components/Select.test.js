import React from 'react';
import Select from './Select';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

// For react v16, enzyme need this Adaptor so far.
configure({ adapter: new Adapter() });

describe('<Select />', () => {
  it('should render', () => {
    const onSelect = sinon.spy();

    const wrapper = shallow(<Select name="testname"
                                    label="labeltest"
                                    onSelect={ onSelect }
                                    options={[]}
    />);
    assert(wrapper.find('label').length === 1);
    assert(wrapper.find('.dropdown-wrapper').length === 1);

  });

  it('should kick on change event', () => {
    const onSelect = sinon.spy();
    const wrapper = shallow(<Select name="testname"
                                    label="labeltest"
                                    onSelect={ onSelect }
                                    options={[{ value: 1, label: 'test'}]}
    />);
    wrapper.find('.dropdown__option').simulate('click', 1);
    assert(onSelect.called, 'called change event');
    assert(wrapper.state().selected === 1);
  });


});

