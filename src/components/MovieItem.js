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
        <img alt="Image not found"
             src={ `${baseUrl}/${posterPath}` }
             height="300"
             width="200"
        />
      </Link>
      <div>title: { title }</div>
      <div>vote average: { voteAverage }</div>
      <div>genres: { genres.filter((g, i) => i < 2).map(g => g.name).join(', ') }</div>
    </div>
  );
};

export default MovieItem;
