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
    const onChange = sinon.spy();
    const wrapper = shallow(<Select name="testname"
                                    label="labeltest"
                                    onChange={ onChange }/>);
    assert(wrapper.find('label').length === 1);
    console.log(wrapper.find('label'));
    assert(wrapper.find('select').length === 1);

  });

  it('should kick on change event', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<Select name="testname"
                                    label="labeltest"
                                    onChange={ onChange }/>);
    wrapper.find('select').simulate('change', { target: { value: 1 }});
    assert(onChange.called, 'called change event');
  });
  
  it('should children options', () => {
    const onChange = sinon.spy();
    const options = <option>a</option>;
    const wrapper = shallow(<Select name="testname"
                                    label="labeltest"
                                    onChange={ onChange }>{options}</Select>);
    assert(wrapper.find('option').length === 1);
  });


});

