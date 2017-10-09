// @flow
import React, { Component } from 'react';
import Select from './Select';
import SelectOption from './SelectOption';
import MovieItem from './MovieItem';
import Waypoint from 'react-waypoint';
import type { Movie } from '../types/home';

type HomeState = {

}

type HomeProps = {
  searching: boolean,
  movies: Array<Movie>,
  getGenres: () => Promise<any>,
  getMovie: () => Promise<any>,
  searchMovies: () => Promise<any>,
  setSorting: (string) => void,
  setFiltering: (string) => void,
  setSearchQuery: (string) => void,
  genres: Array<{ id: number, name: string }>,
  sortOptions: Array<{ label: string, value: string }>,
}

class Home extends Component<HomeProps, HomeState> {

  handleChangeOrderBy(value: string): void {
    const { getMovie, setSorting } = this.props;
    setSorting(value);
    getMovie();
  }

  handleChangeFilter(value: string): void {
    const { getMovie, setFiltering } = this.props;
    setFiltering(value);
    getMovie();
  }

  handleOnKeyDown(e: SyntheticEvent<any>) {
    if(e.key === 'Enter') {
      this.onEnter(e.target.value);
    }
  }

  onEnter(value: string) {
    const { setSearchQuery, searchMovies } = this.props;

    // if search query is input, do searching
    if (value.length) {
      setSearchQuery(value);
      searchMovies();
    }
  }

  handleOnEnterWayPoint() {
    const { searching, getMovie, getGenres, searchMovies, genres } = this.props;

    // if genres are not fetched yes, do fetching first.
    if (! genres.length) {
      return getGenres()
        .then(() => searching ? searchMovies() : getMovie());
    }
    return searching ? searchMovies() : getMovie();
  }


  render() {
    const { movies, genres, sortOptions } = this.props;
    return (
      <div>
        <input  type="text" onKeyDown={ e => this.handleOnKeyDown(e) }/>
        <Select label="Order by" name="sort" onChange={ value => this.handleChangeOrderBy(value)  }>
          {
            sortOptions.map(op => <SelectOption key={ op.value } value={ op.value }>{ op.label }</SelectOption>)
          }
        </Select>
        <Select label="Filter by" name="filter" onChange={ value => this.handleChangeFilter(value) }>
          {
            genres.map(op => <SelectOption key={ op.id } value={ '' + op.id }>{ op.name }</SelectOption>)
          }
        </Select>
        {
          movies.map((movie: Movie) => <MovieItem key={ movie.id } movie={ movie } />)
        }
        <Waypoint onEnter={ () => this.handleOnEnterWayPoint() } />
      </div>
    )
  }

}

export default Home;