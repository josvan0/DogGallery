import React from 'react';
import {
  ImageUrlParamsBuilder,
  buildImageUrl
} from '../helpers/dogApiUrl';

/********** redux **********/

import { connect, Provider } from 'react-redux';
import { ENABLE_RANDOM_MODE } from '../constants/actionTypes';
import store from '../store';

/********** components **********/

import './GalleryImage.css';

/********** react **********/

class Presentational extends React.Component {
  constructor() {
    super();
    this.state = {
      imageSize: 200,
      imageListSize: 15,
      imageList: []
    }

    this.handlePhotoQuantityChange = this.handlePhotoQuantityChange.bind(this);
    this.handleImageSizeChange = this.handleImageSizeChange.bind(this);
    this.ignoreEvent = this.ignoreEvent.bind(this);
    this.queryImages = this.queryImages.bind(this);
  }

  componentDidMount() {
    this.queryImages();
  }

  queryImages() {
    const params = new ImageUrlParamsBuilder()
      .selectBreed(this.props.breed)
      .selectSubBreed(this.props.subBreed)
      .switchRandomMode(this.props.random)
      .setRandomImageListSize(this.state.imageListSize);

    fetch(buildImageUrl(params.build()))
      .then(response => response.json())
      .then(json => {
        if (json.status === 'success') {
          if (this.state.imageListSize === 0) {
            this.setState({
              imageList: [json.message]
            });
          } else {
            this.setState({
              imageList: [...json.message]
            });
          }
        }
      })
      .catch(err => console.error(err));
  }

  handlePhotoQuantityChange(e) {
    this.setState({
      imageListSize: e.target.value
    });
  }

  handleImageSizeChange(e) {
    this.setState({
      imageSize: e.target.value
    });
  }

  ignoreEvent(e) {
    e.preventDefault();
  }

  render() {
    let i = 0;
    const images = this.state.imageList.map(imageUrl => {
      i++;
      return (
        <div
          className="photo"
          key={i}>
          <img
            src={imageUrl}
            alt={`${this.props.breed}-${i}`}
            width={this.state.imageSize} />
        </div>
      );
    });

    return (
      <div className="gallery">
        <div className="controls active">
          <input type="checkbox" />
          <div>
            <input
              type="number"
              id="photo-quantity"
              min="0"
              max="99"
              value={this.state.imageListSize}
              onKeyPress={this.ignoreEvent}
              onChange={this.handlePhotoQuantityChange}
              onLostPointerCapture={this.queryImages} />
            <label htmlFor="photo-quantity">images</label>
          </div>
          <div>
            <input
              type="number"
              id="image-size"
              min="10"
              max="500"
              value={this.state.imageSize}
              onKeyPress={this.ignoreEvent}
              onChange={this.handleImageSizeChange} />
            <label htmlFor="image-size">px</label>
          </div>
        </div>
        <div className="image-list">
          {images}
        </div>
      </div>
    );
  }
}

/********** connection redux **********/

const mapStateToProps = state => ({
  random: state.breeds.randomMode,
  breed: state.breeds.selectedBreed,
  subBreed: state.breeds.selectedSubBreed
});

const mapDispatchToProps = dispatch => ({
  switchRandom: () => {
    dispatch({
      type: ENABLE_RANDOM_MODE
    });
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const GalleryImage = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

export default GalleryImage;
