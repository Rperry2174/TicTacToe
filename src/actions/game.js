import {
  GAME_MODE_CHANGE,
  GAME_HAS_STARTED_CHANGE,
  ADD_PLAYER,
  EDIT_PLAYER,
  NEW_TURN,
} from '../constants';

export function changeGameMode(mode) {
  return {
    type: GAME_MODE_CHANGE,
    payload: mode
  }
}

export function changeGameHasStarted(gameHasStarted) {
  return {
    type: GAME_HAS_STARTED_CHANGE,
    payload: gameHasStarted
  }
}

export function addPlayer(playerName) {
  return {
    type: ADD_PLAYER,
    payload: playerName
  }
}

export function newTurn(playerIndex) {
  // Toggle back and forth between 0 and 1
  let newPlayerIndex = playerIndex == 0 ? 1 : 0;
  return {
    type: NEW_TURN,
    payload: newPlayerIndex
  }
}
