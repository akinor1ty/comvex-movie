import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col }from 'react-flexbox-grid';
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
      <Grid>
        <Row>
          <Col xs={ 4 }>
            <Row>
              {
                backDrops.map(bd => (
                  <Col>
                    <img width={ 200 } alt="image not found" src={ baseUrl + bd.filePath } />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col xs={ 8 }>
            <Link to="/">
              <div className="back-to-home">
                <a className="arrow arrow--left" />
                <button className="button back-to-home__button">Back to list</button>
              </div>
            </Link>
            <div className="sub-header details__sub-header">
              <div className="heading details__sub-header__heading">
                { title }
                <span className="details__release-year">{ `(${new Date(releaseDate).getFullYear()})` }</span>
              </div>
            </div>
            <div className="details__description">
              { overview }
            </div>
            <div className="items">
              <svg className="items__donut" viewBox="0 0 42 42">
                <circle className="items__donut__ring"
                        cx="21"
                        cy="21"
                        r="15.91549430918954" />
                <circle className="items__donut__segment" cx="21" cy="21" r="15.91549430918954" stroke-dasharray={ `${voteAverage * 10} ${100 - voteAverage * 10}`} />
                <text className="items__donut__number" x="21" y="21" >{ voteAverage }</text>
              </svg>
              <div className="items__smalls">
                <div className="items__smalls__release-date">
                  <label className="items__smalls__release-date__label">
                    Release date
                  </label>
                  <div className="items__smalls__release-date__date">
                    { releaseDate }
                  </div>
                </div>
                <div className="items__smalls__genre">
                  <label className="items__smalls__genre__label">
                    Genre
                  </label>
                  <div className="items__smalls__genre__items">
                    {
                      genres
                        .filter((g, i) => i < 2)
                        .map(g => g.name)
                        .join(',')
                    }
                  </div>
                </div>
                <div className="items__smalls__duration">
                  <label className="items__smalls__duration__label">Duration</label>
                  <div className="items__smalls__duration__duration">
                    { `${runtime} min` }
                  </div>
                </div>
              </div>

            </div>

              {
                casts
                  .filter((c, i) => i < 3)
                  .map(c => (
                    <ul className="cast">
                      <li className="cast__actor" key={c.name}>
                        <img className="cast__actor__image"
                             src={ `https://image.tmdb.org/t/p/w75${c.profilePath}`}/>
                        <span className="cast__actor___name">
                        { `${c.name}` }
                        </span>
                        <span>
                          As...
                        </span>
                        <span className="cast__actor___character">
                          { `${c.character}` }
                        </span>
                      </li>
                    </ul>
                  ))
              }

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Details;