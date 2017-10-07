import React from 'react';
import MovieItem from './MovieItem';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'power-assert';
const deepEqual = assert.deepEqual;

// For react v16, enzyme need this Adaptor so far.
configure({ adapter: new Adapter() });

describe('<MovieItem>', () => {
  it('should render', () => {
    const props = {
      movie: {
        title: 'title_test',
        posterPath: '/testpath',
        voteAverage: 1,
        genres: [],
      }
    };
    const wrapper = shallow(<MovieItem { ...props } />);
    assert(wrapper.find('img').length === 1, 'has img tag');
    deepEqual(wrapper.find('div').at(1).props().children , ['title: ', 'title_test']);
    deepEqual(wrapper.find('div').at(2).props().children , ['vote average: ', '1']);
    deepEqual(wrapper.find('div').at(3).props().children , ['genres: ', '']);
  });

  it('should render genres', () => {
    let props = {
      movie: {
        title: 'title_test',
        posterPath: '/testpath',
        voteAverage: 1,
        genres: [{id: 1, name: 'test'}],
      }
    };
    let wrapper = shallow(<MovieItem { ...props } />);
    deepEqual(wrapper.find('div').at(3).props().children , ['genres: ', 'test']);

    props = {
      movie: {
        title: 'title_test',
        posterPath: '/testpath',
        voteAverage: 1,
        genres: [{id: 1, name: 'test'}, {id: 1, name: 'test1'}],
      }
    };
    wrapper = shallow(<MovieItem { ...props } />);
    deepEqual(wrapper.find('div').at(3).props().children , ['genres: ', 'test, test1']);

    props = {
      movie: {
        title: 'title_test',
        posterPath: '/testpath',
        voteAverage: 1,
        genres: [{id: 1, name: 'test'}, {id: 1, name: 'test1'}, {id: 1, name: 'test2'}],
      }
    };
    wrapper = shallow(<MovieItem { ...props } />);
    deepEqual(wrapper.find('div').at(3).props().children , ['genres: ', 'test, test1'], 'render less than 2 genres');
  });
});
