import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Details from '../components/Details';
import { detailsActionCreators } from '../actions/details';

function mapStateToProps(state) {
  return state.details;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(detailsActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
