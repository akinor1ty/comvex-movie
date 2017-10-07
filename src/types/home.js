// @flow
export type Movie = {
  id: number,
  title: string,
  posterPath: string,
  genreIds: Array<number>,
  voteAverage: number,
  popularity: number,
  genres: Array<Genre>,
}

export type Genre = {
  id: number,
  name: string
}
