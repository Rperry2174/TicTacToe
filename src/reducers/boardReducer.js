import { BOARD_CHANGE } from '../constants';
const initialState = {
  board: [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0],
  ]
};

const boardReducer = (state = initialState, action) => {
  switch(action.type) {
    case BOARD_CHANGE:
      return {
        ...state,
        board:action.payload
      };
    default:
      return state;
  }
}

export default boardReducer;
