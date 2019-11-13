import {createStore, combineReducers} from 'redux';
import gameReducer from '../reducers/gameReducer';

const rootReducer = combineReducers({
  game: gameReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
