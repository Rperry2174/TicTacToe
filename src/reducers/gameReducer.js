import {
  BOARD_CHANGE,
  GAME_MODE_CHANGE,
  GAME_HAS_STARTED_CHANGE,
  ADD_PLAYER,
  EDIT_PLAYER,
  NEW_TURN,
  UPDATE_WINNING_PLAYER,
  RESTART_GAME
} from '../constants';

const initialState = {
  gameStateIndex: 0,
  winningPlayerIndex: null,
  mode: 0,
  players: ["joe", "bob"],
  playerTurn: 1,
  matrix: [
    [10, 10, 10],
    [10, 10, 10],
    [10, 10, 10],
  ]
};

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case BOARD_CHANGE:
      return {
        ...state,
        matrix: action.payload
      };
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
    case UPDATE_WINNING_PLAYER:
      return {
        ...state,
        winningPlayerIndex: action.payload
      };
    case RESTART_GAME:
      return {
        ...state,
        winningPlayerIndex: null,
      };

    default:
      return state;
  }
}

export default gameReducer;
