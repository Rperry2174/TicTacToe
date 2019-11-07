import { BOARD_CHANGE } from '../constants';

export function changeBoard(board) {
  return {
    type: BOARD_CHANGE,
    payload: board
  }
}
