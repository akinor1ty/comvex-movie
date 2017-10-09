// @flow
import * as ActionsTypes from '../constants/ActionTypes';

type CastProfile = {
  id: number,
  character: string,
  name: string,
  profilePath: string
}

type DetailsState = {
  id: number,
  overview: string,
  releaseDate: string,
  genres: Array<{ id: number, name: string }>,
  runtime: number,
  backDrops: Array<string>,
  casts: Array<CastProfile>,
  voteAverage: number,
}

const initialState = {
  genres: [],
  backDrops: [],
  casts: [],
};

export default (state: DetailsState = initialState, action) => {

  switch(action.type) {
    case ActionsTypes.GET_DETAILS_SUCCESS: {
      const { data } = action;

      const details = {
        id: data.id,
        title: data.title,
        releaseDate: data.release_date,
        genres: data.genres,
        runtime: data.runtime,
        voteAverage: data.vote_average,
        overview: data.overview,
      };
      return {
        ...state,
        ...details
      }
    }

    case ActionsTypes.GET_IMAGES_SUCCESS: {
      const { data } = action;
      const { backdrops } = data;
      return {
        ...state,
        backDrops: backdrops.map(bd => ({ filePath: bd.file_path }))
      }
    }

    case ActionsTypes.GET_CASTS_SUCCESS: {
      const { data } = action;
      const { cast } = data;
      return {
        ...state,
        casts: cast.map(c => (
          {
            name: c.name,
            character: c.character,
            profilePath: c.profile_path
          }
        ))
      }
    }
    default: {
      return state;
    }
  }
}
