import React from 'react';

/********** redux **********/

import { connect, Provider } from 'react-redux';
import {
  ENABLE_RANDOM_MODE,
  QUERY_IMAGE_LIST
} from '../constants/actionTypes';
import store from '../store';

/********** components **********/

import './GalleryImage.css';

/********** react **********/

class Presentational extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="gallery"></div>
    );
  }
}

/********** connection redux **********/

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const GalleryImage = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

export default GalleryImage;
