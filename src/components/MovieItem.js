// @flow
import React, { Component } from 'react';
import type { Movie } from '../types/home';
import { Link } from 'react-router-dom';

type MovieItemProps = {
  movie: Movie
}

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieItem = (props: MovieItemProps) => {
  const { movie } = props;
  const { id, title, posterPath, voteAverage, genres } = movie;

  return (
    <div>
      <Link to={ `/movie/${id}`}>
        <div className="movie-item">
          <img className="movie-item__image" alt="Image not found"
               src={ `${baseUrl}/${posterPath}` }
          />
          <div className="movie-item__vote-average">
            <div className="movie-item__vote-average__number">
              { voteAverage }
            </div>
          </div>
        </div>
      </Link>
      <div className="movie-item__title">{ title }</div>
      <div className="movie-item__genre">{ genres.filter((g, i) => i < 2).map(g => g.name).join(', ') }</div>
    </div>
  );
};

export default MovieItem;
