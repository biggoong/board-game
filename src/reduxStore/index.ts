import { combineReducers } from 'redux';
import { boardReducer } from './modules/board';

export const rootReducer = combineReducers({
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;