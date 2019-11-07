import { BOARD_CHANGE } from '../constants';
const initialState = {
  matrix: [
    [0, 0, 0],
    [0, 1, 1],
    [2, 0, 0],
  ]
};

const boardReducer = (state = initialState, action) => {
  switch(action.type) {
    case BOARD_CHANGE:
      return {
        ...state,
        matrix: action.payload
      };
    default:
      return state;
  }
}

export default boardReducer;
