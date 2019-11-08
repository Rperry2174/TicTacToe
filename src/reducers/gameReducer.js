import {
  GAME_MODE_CHANGE,
  GAME_HAS_STARTED_CHANGE,
  ADD_PLAYER,
  EDIT_PLAYER,
  NEW_TURN,
} from '../constants';

const initialState = {
  gameHasStarted: false,
  mode: 0,
  players: ["joe", "bob"],
  playerTurn: 1,
};

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case GAME_MODE_CHANGE:
      return {
        ...state,
        mode: action.payload
      };
    case GAME_HAS_STARTED_CHANGE:
      return {
        ...state,
        gameHasStarted: action.payload
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: action.payload
      };
    case EDIT_PLAYER:
      return {
        ...state,
        players: action.payload
      };
    case NEW_TURN:
      return {
        ...state,
        playerTurn: action.payload
      };
    default:
      return state;
  }
}

export default gameReducer;
