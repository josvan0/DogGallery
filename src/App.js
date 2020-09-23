import React from 'react';
import { LIST_ALL_BREEDS_URL, buildSubBreedListUrl } from './helpers/dogApiUrl';
import { STR_EMPTY } from './helpers/stringUtilities';

/********** redux **********/

import { connect, Provider } from 'react-redux';
import {
  SELECT_BREED,
  SELECT_SUB_BREED,
  UPDATE_BREED_LIST,
  UPDATE_SUB_BREED_LIST
} from './constants/actionTypes';
import store from './store';

/********** components **********/

import './App.css';
import BreedList from './components/BreedList';
import GalleryImage from './components/GalleryImage';

/********** react **********/

class Presentational extends React.Component {
  constructor() {
    super();
    this.handleBreedSelected = this.handleBreedSelected.bind(this);
    this.handleSubBreedSelected = this.handleSubBreedSelected.bind(this);
  }

  componentDidMount() {
    fetch(LIST_ALL_BREEDS_URL)
      .then(response => response.json())
      .then(json => {
        if (json.status === 'success') {
          this.props.setBreedList(Object.keys(json.message));
        }
      })
      .catch(err => console.error(err));
  }

  handleBreedSelected(e) {
    const value = e.target.value;
    this.props.selectBreed(value.includes('all') ? STR_EMPTY : value);

    // reset subBreed list to select all
    const subBreedRadios = document.getElementsByName('Sub-Breeds');
    subBreedRadios.forEach(radio => radio.checked = false);
    if (subBreedRadios.length > 0) {
      subBreedRadios[0].checked = true;
    }

    if (!value.includes('all')) {
      fetch(buildSubBreedListUrl(value))
        .then(response => response.json())
        .then(json => {
          if (json.status === 'success') {
            this.props.setSubBreedList(json.message);
          }
        })
        .catch(err => console.error(err));
    }
  }

  handleSubBreedSelected(e) {
    const value = e.target.value;
    this.props.selectSubBreed(value.includes('all') ? STR_EMPTY : value);
  }

  render() {
    return (
      <div className="app">
        <div className="breeds">
          <BreedList
            listName="Principal breeds"
            breedList={this.props.breedList}
            selectHandler={this.handleBreedSelected} />
          <BreedList
            listName="Sub-Breeds"
            breedList={this.props.subBreedList}
            selectHandler={this.handleSubBreedSelected} />
        </div>
        <GalleryImage />
      </div>
    );
  }
}

/********** connection redux **********/

const mapStateToProps = state => ({
  breedList: state.breeds.breedList,
  subBreedList: state.breeds.subBreedList
});

const mapDispatchToProps = dispatch => ({
  selectBreed: breedSelected => {
    dispatch({
      type: SELECT_BREED,
      payload: breedSelected
    });
  },
  selectSubBreed: subBreedSelected => {
    dispatch({
      type: SELECT_SUB_BREED,
      payload: subBreedSelected
    });
  },
  setBreedList: newBreedList => {
    dispatch({
      type: UPDATE_BREED_LIST,
      payload: newBreedList
    });
  },
  setSubBreedList: newSubBreedList => {
    dispatch({
      type: UPDATE_SUB_BREED_LIST,
      payload: newSubBreedList
    });
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

export default App;
