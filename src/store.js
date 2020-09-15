import { createStore, combineReducers } from 'redux';
import breedListReducer from './reducers/breedList';
import galleryImageReducer from './reducers/galleryImage';

const reducer = combineReducers({
  breeds: breedListReducer,
  gallery: galleryImageReducer
});

export default createStore(reducer);
