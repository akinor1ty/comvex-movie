import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { homepageActionCreators } from '../actions/homepage';

function mapStateToProps(state) {
  return state.homepage;
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators(homepageActionCreators, dispatch) 
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);