// @flow
import React, { Component } from 'react';
import Select from './Select';
import SelectOption from './SelectOption';
import MovieItem from './MovieItem';
import Waypoint from 'react-waypoint';
import type { Movie } from '../types/home';
import Search from './Search';
import { Grid, Row, Col } from 'react-flexbox-grid';
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

  onSearch(value: string) {
    const { setSearchQuery, searchMovies } = this.props;

    // if search query is input, do searching
    setSearchQuery(value);
    searchMovies();
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

  handleSearchChange(value) {
    const { searchQuery, setSearchQuery } = this.props;

    if(value !== searchQuery) {
      setSearchQuery(value);
    }
  }

  render() {
    const { movies, genres, sortOptions, filterWith, sortBy, searchQuery, setSearchQuery } = this.props;
    const genreOptions = genres.map(g => ({ value: g.id, label: g.name }));
    return (
      <div className="home">
        <div className="sub-header">
          <h1 className="heading">All Movies</h1>
          <Search searchingValue={ searchQuery }
                  onSearch={ value => this.onSearch(value) }
                  onClose={ () => setSearchQuery(null) }
                  onChange={ value => this.handleSearchChange(value) }
          />
        </div>
        <Select value={ sortBy } options={ sortOptions } label="Order by" name="sort" onSelect={ value => this.handleChangeOrderBy(value)  }/>
        <Select value={ filterWith } options={ genreOptions } label="Filter by" name="filter" onSelect={ value => this.handleChangeFilter(value) }/>
        <Grid fluid className="grid-container">
          <Row>
            {
              movies.map((movie: Movie) => <Col xs={6} md={3} key={ movie.id }><MovieItem movie={ movie } /></Col>)
            }
          </Row>
        </Grid>
        <Waypoint onEnter={ () => this.handleOnEnterWayPoint() } />
      </div>
    )
  }

}

export default Home;