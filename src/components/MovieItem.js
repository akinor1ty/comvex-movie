// @flow
import React, { Component } from 'react';
import type { Movie } from '../types/home';

type MovieItemProps = {
  movie: Movie
}

const baseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieItem = (props: MovieItemProps) => {
  const { movie } = props;
  const { title, posterPath, voteAverage, genres } = movie;

  return (
    <div>
      <img alt="Image not found"
           src={ `${baseUrl}/${posterPath}` }
           height="300"
           width="200"
      />
      <div>title: { title }</div>
      <div>vote average: { voteAverage }</div>
      <div>genres: { genres.filter((g, i) => i < 2).map(g => g.name).join(', ') }</div>
    </div>
  );
};

export default MovieItem;
