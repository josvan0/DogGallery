import React from 'react';
// utilities
import {
  ImageUrlParamsBuilder,
  buildImageUrl
} from '../helpers/dogApiUrl';
// redux
import { connect, Provider } from 'react-redux';
import { ENABLE_RANDOM_MODE } from '../constants/actionTypes';
import store from '../store';
// components
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
    this.handleRandomModeChange = this.handleRandomModeChange.bind(this);
    this.queryImages = this.queryImages.bind(this);
  }

  // life cycle
  componentDidMount() {
    this.queryImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.breed !== prevProps.breed ||
      this.props.subBreed !== prevProps.subBreed) {
        this.queryImages();
      }
  }

  // handlers
  handlePhotoQuantityChange(e) {
    this.setState({
      imageListSize: Number.parseInt(e.target.value)
    });
  }

  handleImageSizeChange(e) {
    this.setState({
      imageSize: Number.parseInt(e.target.value)
    });
  }

  handleRandomModeChange() {
    this.props.switchRandom();
    const controls = document.querySelector('.controls');
    controls.classList.toggle('inactive');
    setTimeout(() => this.queryImages(), 10);
  }

  // others
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
          if (this.state.imageListSize === 0 &&
            this.props.random) {
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

  render() {
    let i = 1;
    const images = this.state.imageList.map(imageUrl => {
      return (
        <div
          className="photo"
          title="Click to view original size"
          key={i}
          onClick={() => window.open(imageUrl, '_blank')}>
          <img
            src={imageUrl}
            alt={`${this.props.breed}-${i++}`}
            height={this.state.imageSize} />
        </div>
      );
    });

    return (
      <div className="gallery">
        <div className="controls">
          <input
            type="checkbox"
            id="random-mode"
            className="random-mode"
            checked={this.props.random}
            onChange={this.handleRandomModeChange} />
          <label htmlFor="random-mode">Random mode</label>
          <div>
            <input
              type="number"
              id="photo-quantity"
              min="0"
              max="30"
              value={this.state.imageListSize}
              onKeyPress={e => e.preventDefault()}
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
              onKeyPress={e => e.preventDefault()}
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
  random: state.gallery.randomMode,
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
