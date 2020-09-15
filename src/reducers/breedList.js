import { defaultState } from '../constants/state';
import {
  SELECT_BREED,
  SELECT_SUB_BREED,
  UPDATE_BREED_LIST,
  UPDATE_SUB_BREED_LIST
} from '../constants/actionTypes';

function breedListReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_BREED:
      return Object.assign({}, state, {
        selectedBreed: action.payload
      });
    case SELECT_SUB_BREED:
      return Object.assign({}, state, {
        selectedSubBreed: action.payload
      });
    case UPDATE_BREED_LIST:
      return Object.assign({}, state, {
        breedList: action.payload
      });
    case UPDATE_SUB_BREED_LIST:
      return Object.assign({}, state, {
        subBreedList: action.payload
      });
    default:
      return state;
  }
}

export default breedListReducer;
