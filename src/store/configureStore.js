import { createStore, combineReducers } from 'redux';
import boardReducer from '../reducers/boardReducer';

const rootReducer = combineReducers(
  { board: boardReducer }
);

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;
