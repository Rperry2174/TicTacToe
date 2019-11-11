import {
  BOARD_CHANGE,
  GAME_MODE_CHANGE,
  GAME_STATE_CHANGE,
  RESTART_GAME,
  EDIT_PLAYER,
  NEW_TURN,
  UPDATE_WINNING_PLAYER,
} from '../constants';

export function changeBoard(board) {
  return {
    type: BOARD_CHANGE,
    payload: board
  }
}

export function changeGameMode(mode) {
  return {
    type: GAME_MODE_CHANGE,
    payload: mode
  }
}

export function restartGame(mode) {
  return {
    type: RESTART_GAME,
    payload: mode
  }
}

export function changeGameState(gameState) {
  return {
    type: GAME_STATE_CHANGE,
    payload: gameState
  }
}

export function editPlayer(playerIndex, playerName) {
  return {
    type: EDIT_PLAYER,
    payload: { playerIndex: playerIndex, playerName: playerName }
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

export function updateWinningPlayer(matrix) {

  // TODO: Find a cleaner way to do this
  // For now, if player 1 (index 0) wins then the sum of their squares will be 0
  //          if player 2 (index 1) wins the nthe sum of their squares will be 3
  const winningSums = [0, 3]

  let rowSums = {
    0: 0,
    1: 0,
    2: 0
  }

  let columnSums = {
    0: 0,
    1: 0,
    2: 0
  }

  let diagonalSums = {
    topLeftToBottomRight: 0,
    topRightToBottomLeft: 0
  }

  for(let row = 0; row < 3; row++){
    //check full row
    for(let col = 0; col < 3; col++){
      let currentVal = matrix[row][col]
      columnSums[col] += currentVal
      rowSums[row] += currentVal

      if(row == col) {
        diagonalSums.topLeftToBottomRight += currentVal;
      }

      if (row + col == 2) {
        diagonalSums.topRightToBottomLeft += currentVal;
      }
    }
  }

  let winningPlayerValues = [];
  [rowSums, columnSums, diagonalSums].forEach((direction) => {
    console.log("direction: ", direction);
    Object.values(direction).forEach((values) => {
      winningPlayerValues.push(values)
    })
  })

  let winningPlayerIndex = null
  for(let i = 0; i < winningPlayerValues.length; i++) {
    winningPlayerIndex = winningSums.indexOf(winningPlayerValues[i])
    if(winningPlayerIndex >= 0) {
      break;
    } else {
      winningPlayerIndex = null
    }
  }

  return {
    type: UPDATE_WINNING_PLAYER,
    payload: winningPlayerIndex
  }
}
