import defaultState from '../constants/state';
import { ENABLE_RANDOM_MODE } from '../constants/actionTypes';

function galleryImageReducer(state = defaultState, action) {
  switch (action.type) {
    case ENABLE_RANDOM_MODE:
      return Object.assign({}, state, {
        randomMode: !state.randomMode
      });
    default:
      return state;
  }
}

export default galleryImageReducer;
