import {
  BOARD_CHANGE,
  GAME_MODE_CHANGE,
  GAME_STATE_CHANGE,
  ADD_PLAYER,
  EDIT_PLAYER,
  NEW_TURN,
  UPDATE_WINNING_PLAYER,
  RESTART_GAME
} from '../constants';

const initialState = {
  gameState: "title",
  winningPlayerIndex: null,
  mode: 1,
  players: ["joe", "bob"],
  playerTurn: 0,
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
    case GAME_STATE_CHANGE:
      return {
        ...state,
        gameState: action.payload
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
        matrix: [
          [10, 10, 10],
          [10, 10, 10],
          [10, 10, 10],
        ],
        playerTurn: 0,
        gameState: action.payload
      };

    default:
      return state;
  }
}

export default gameReducer;
