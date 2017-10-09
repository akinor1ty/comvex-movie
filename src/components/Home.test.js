import React from 'react';
import Home from './Home';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from './Select';
import assert from 'power-assert';
import Waypoint from 'react-waypoint';
import sinon from 'sinon';

// For react v16, enzyme need this Adaptor so far.
configure({ adapter: new Adapter() });

describe('<Home>', () => {
  it('should render', () => {
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      searching: false,
    };
    const wrapper = shallow(<Home { ..._props } />);

    assert(wrapper.find('div').length === 1);
    assert(wrapper.find('input').length === 1);
    assert(wrapper.find(Select).length === 2);
    assert(wrapper.find(Waypoint).length === 1);


  });

  it('should render and handle order by', () => {
    const getMovie = sinon.spy();
    const setSorting = sinon.spy();
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      getMovie: getMovie,
      setSorting: setSorting,
    };
    const wrapper = shallow(<Home { ..._props } />);
    const orderBy = wrapper.find(Select).at(0);
    assert(orderBy.props().label === 'Order by');
    assert(orderBy.props().name === 'sort');

    orderBy.simulate('change', 'test');
    assert(setSorting.calledWith('test'));
    assert(getMovie.called);
  });

  it('should render and handle filter with', () => {
    const getMovie = sinon.spy();
    const setFiltering = sinon.spy();
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      getMovie: getMovie,
      setFiltering: setFiltering,
    };
    const wrapper = shallow(<Home { ..._props } />);
    const filterWith = wrapper.find(Select).at(1);
    assert(filterWith.props().label === 'Filter by');
    assert(filterWith.props().name === 'filter');

    filterWith.simulate('change', 'test');
    assert(setFiltering.calledWith('test'));
    assert(getMovie.called);
  });

  it('should render and handle searching', () => {
    const searchMovies = sinon.spy();
    const setSearchQuery = sinon.spy();
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      searchMovies: searchMovies,
      setSearchQuery: setSearchQuery,
    };
    const wrapper = shallow(<Home { ..._props } />);
    const searchBox = wrapper.find('input');
    assert(searchBox.props().type === 'text');

    searchBox.simulate('keyDown', { target: { value: 'test' }, key: 'Enter' });
    assert(setSearchQuery.calledWith('test'));
    assert(searchMovies.called);
  });

  it('should render with sort options', () => {
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [
        { value: 'test', label: 'labeltest' }
      ],
    };
    const wrapper = shallow(<Home { ..._props } />);

  });

  it('should fetch genres and movies when scrolled ', () => {
    const getMovie = sinon.spy(() => new Promise(resolve => resolve));
    const getGenres = sinon.spy(getMovie);
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      searching: false,
      getGenres: getGenres,
      getMovie: getMovie
    };
    const wrapper = shallow(<Home { ..._props }/>);
    wrapper.find(Waypoint).simulate('enter');
    assert(getGenres.called);
    assert(getMovie.called);
  });

  it('should just fetch movies when scrolled ', () => {
    const getMovie = sinon.spy();
    const _props = {
      movies: [],
      genres: [{ id: 1, label: 'label', name: 'name' }],
      sortOptions: [],
      searching: false,
      getMovie: getMovie
    };
    const wrapper = shallow(<Home { ..._props }/>);
    wrapper.find(Waypoint).simulate('enter');
    assert(getMovie.called);
  });

  it('should fetch genres and search movies when scrolled ', () => {
    const searchMovies = sinon.spy(() => new Promise(resolve => resolve));
    const getGenres = sinon.spy(searchMovies);
    const _props = {
      movies: [],
      genres: [],
      sortOptions: [],
      searching: true,
      getGenres: getGenres,
    };
    const wrapper = shallow(<Home { ..._props }/>);
    wrapper.find(Waypoint).simulate('enter');
    assert(getGenres.called);
    assert(searchMovies.called);
  });

  it('should just search movies when scrolled ', () => {
    const searchMovies = sinon.spy();

    const _props = {
      movies: [],
      genres: [{ id: 1, label: 'label', name: 'name' }],
      sortOptions: [],
      searching: true,
      searchMovies: searchMovies
    };
    const wrapper = shallow(<Home { ..._props }/>);
    wrapper.find(Waypoint).simulate('enter');
    assert(searchMovies.called);
  });


});
