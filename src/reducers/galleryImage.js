import defaultState from '../constants/state';

/********** actions **********/
import {
  ENABLE_RANDOM_MODE,
  QUERY_IMAGE_LIST
} from '../constants/actionTypes';

function galleryImageReducer(state = defaultState, action) {
  switch (action.type) {
    case ENABLE_RANDOM_MODE:
      return Object.assign({}, state, {
        randomMode: !state.randomMode
      });
    case QUERY_IMAGE_LIST:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export default galleryImageReducer;
