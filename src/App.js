import React from 'react';
/* redux */
import { connect, Provider } from 'react-redux';
import { UPDATE_BREED_LIST, UPDATE_SUB_BREED_LIST } from './constants/actionTypes';
import store from './store';
/* components */
import './App.css';
import BreedList from './components/BreedList';
import GalleryImage from './components/GalleryImage';
/* dog API */
import { LIST_ALL_BREEDS_URL } from './helpers/dogApiUrl';

/* react */
class Presentational extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch(LIST_ALL_BREEDS_URL)
      .then(response => response.json())
      .then(json => {
        if (json.status === 'success') {
          this.props.updateBreedList(Object.keys(json.message));
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <div className="breeds">
          <BreedList
            listName="Principal breeds"
            breedList={this.props.breedList} />
          <BreedList
            listName="Sub-Breeds"
            breedList={this.props.subBreedList} />
        </div>
        <GalleryImage />
      </div>
    );
  }
}

/* connect redux */
const mapStateToProps = state => ({
  breedList: state.breeds.breedList,
  subBreedList: state.breeds.subBreedList
});

const mapDispatchToProps = dispatch => ({
  updateBreedList: newBreedList => {
    dispatch({
      type: UPDATE_BREED_LIST,
      payload: newBreedList
    });
  },
  updateSubBreedList: newSubBreedList => {
    dispatch({
      type: UPDATE_SUB_BREED_LIST,
      payload: newSubBreedList
    });
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default App;
