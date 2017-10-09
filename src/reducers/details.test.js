import assert from 'power-assert';
import reducer from './details';
import * as types from '../constants/ActionTypes';
const deepEqual = assert.deepEqual;

describe('details reducer', () => {

  it('should return initial state', () => {
    const expected = {
      genres: [],
      backDrops: [],
      casts: [],
    };
    deepEqual(reducer(undefined, {}), expected);
  });

  it('should set fetched details data', () => {
    const data = {
      genres: [
        {
          "id": 18,
          "name": "Drama"
        }
      ],
      id: 550,
      release_date: "1999-10-12",
      runtime: 139,
      title: "Fight Club",
      vote_average: 7.8,
      overview: 'test',
    };
    const action = { type: types.GET_DETAILS_SUCCESS, data: data };
    const expected = {
      id: 550,
      genres: [{"id": 18, "name": "Drama"}],
      backDrops: [],
      casts: [],
      runtime: 139,
      title: 'Fight Club',
      voteAverage: 7.8,
      releaseDate: "1999-10-12",
      overview: 'test',
    };
    deepEqual(reducer(undefined, action), expected);
  });

  it('should set fetched images', () => {
    const data = {
      "id": 550,
      "backdrops": [
        {
          "aspect_ratio": 1.77777777777778,
          "file_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          "height": 720,
          "iso_639_1": null,
          "vote_average": 0,
          "vote_count": 0,
          "width": 1280
        }
      ],
      "posters": [
        {
          "aspect_ratio": 0.666666666666667,
          "file_path": "/fpemzjF623QVTe98pCVlwwtFC5N.jpg",
          "height": 1800,
          "iso_639_1": "en",
          "vote_average": 0,
          "vote_count": 0,
          "width": 1200
        }
      ]
    };
    const action = { type: types.GET_IMAGES_SUCCESS, data: data };
    const expected = {
      genres: [],
      backDrops: [{"filePath": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg"}],
      casts: []
    };
    deepEqual(reducer(undefined, action), expected);
  });

  it('should set fetched casts', () => {
    const data = {
      "id": 550,
      "cast": [
        {
          "cast_id": 4,
          "character": "The Narrator",
          "credit_id": "52fe4250c3a36847f80149f3",
          "gender": 2,
          "id": 819,
          "name": "Edward Norton",
          "order": 0,
          "profile_path": "/eIkFHNlfretLS1spAcIoihKUS62.jpg"
        },
        {
          "cast_id": 5,
          "character": "Tyler Durden",
          "credit_id": "52fe4250c3a36847f80149f7",
          "gender": 2,
          "id": 287,
          "name": "Brad Pitt",
          "order": 1,
          "profile_path": "/kc3M04QQAuZ9woUvH3Ju5T7ZqG5.jpg"
        }
      ]
    };
    const action = { type: types.GET_CASTS_SUCCESS, data: data };
    const expected = {
      genres: [],
      backDrops: [],
      casts: [
        { name: 'Edward Norton', character: 'The Narrator', profilePath: '/eIkFHNlfretLS1spAcIoihKUS62.jpg' },
        { name: 'Brad Pitt', character: 'Tyler Durden', profilePath: '/kc3M04QQAuZ9woUvH3Ju5T7ZqG5.jpg'  },
      ]
    };
    deepEqual(reducer(undefined, action), expected);
  });
});
