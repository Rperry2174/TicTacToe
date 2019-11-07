import { createStore, combineReducers } from 'redux';
import boardReducer from '../reducers/boardReducer';
import gameReducer from '../reducers/gameReducer';

const rootReducer = combineReducers(
  {
    board: boardReducer,
    game: gameReducer
  }
);

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;
