// @flow
import React, { Component } from 'react';
import './App.css';
import Home from './containers/homepage';
import Details from './containers/details';
import { brow } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

type Props = {

};

type State = {
};

class App extends Component<Props, State> {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header">Movies</div>
          <div className="content">
            <Route exact path={'/'} component={Home} />
            <Route path={'/movie/:id'} component={Details} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
