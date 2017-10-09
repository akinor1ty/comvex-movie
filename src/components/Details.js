import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Details extends Component {
  componentWillMount() {
    console.log('dispatch')
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        details
      </div>
    );
  }
};

export default Details;