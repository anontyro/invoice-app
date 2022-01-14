import { combineReducers } from 'redux';
import user from './User/reducer';
import invoices from './Invoices/reducer';

const appReducer = combineReducers({
  user,
  invoices,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
