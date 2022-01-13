import { UserActions } from './actions';
import { SET_USER, CLEAR_USER } from './consts';
import { UserState } from './interface';

export const INITIAL_STATE: UserState = {
  username: null,
  userId: null,
  firstName: null,
  lastName: null,
};

const user = (state: UserState = INITIAL_STATE, action: UserActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default user;
