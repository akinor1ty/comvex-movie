import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// For react v16, enzyme need this Adaptor so far.
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('has App class.', () => {
  const wrapper = shallow(<App/>);
  assert(wrapper.find('.App').length === 1);
});
