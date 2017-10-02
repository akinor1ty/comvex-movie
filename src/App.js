// @flow
import React, { Component } from 'react';
import './App.css';
import Home from './containers/homepage';

type Props = {

};

type State = {
};

class App extends Component<Props, State> {
  render () {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
