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
  return {
    type: NEW_TURN,
    payload: playerIndex
  }
}
