import { combineReducers } from 'redux';
import user from './User/reducer';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
