// @flow
import React, { Component } from 'react';

type HomeState = {

}

type HomeProps = {
  movies: Array,
}

class Home extends Component<HomeState, HomeProps> {

  componentDidMount() {
    const { getMovie } = this.props;
    getMovie();
  }

  render() {
    const { movies } = this.props;
    return (
      <div>
        {
          movies.map(movie => (
            <div>
              <img src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path } />
              { movie.original_title }
              </div>
            )
          )
        }
      </div>
    )
  }

}

export default Home;