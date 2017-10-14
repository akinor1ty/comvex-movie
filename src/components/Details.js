import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const baseUrl = 'https://image.tmdb.org/t/p/w500';

class Details extends Component {
  componentWillMount() {
    const { match, getDetails, getCasts, getImages } = this.props;
    const { id } = match.params;
    getDetails(id);
    getCasts(id);
    getImages(id);
  }

  render() {
    const {
      title, overview, genres, runtime, releaseDate, casts,
      voteAverage, backDrops
    } = this.props;
    return (
      <div>
        <Link to="/">
          <button id="back-to-home">Back to list</button>
        </Link>
        <a className="arrow sample5-6">共通</a>
        <div id="title">
          { title }
          <span id="release-year">{ `(${new Date(releaseDate).getFullYear()})` }</span>
        </div>
        <svg width="100" height="100" viewBox="0 0 42 42" class="donut">
          <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>
          <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" stroke-width="3" stroke-dasharray={ `${voteAverage * 10} ${100 - voteAverage * 10}`} stroke-dashoffset="25"></circle>
          <text x="21" y="21" text-anchor="middle" fontSize={8} dominant-baseline="central">{ voteAverage }</text>
        </svg>
        { overview }
        <div id="vote-average">{ voteAverage }</div>
        <div>
          <label>Release date: </label>
          <div>{releaseDate}</div>
        </div>
        <div>
          <label>Genre: </label>
            {
              genres
                .filter((g, i) => i < 2)
                .map(g => <div>{ g.name }</div>)
            }
        </div>
        <div>
          <label>Duration: </label>
          <div>{ `${runtime} min` }</div>
        </div>
        <ul id="cast">
          { casts.filter((c, i) => i < 3).map(c => <li>{ `${c.name} As... ${c.character}` }</li>) }
        </ul>
        <div id="images">
          { backDrops.map(bd => <img alt="image not found" src={ baseUrl + bd.filePath } />) }
        </div>
      </div>
    );
  }
};

export default Details;