import { SET_USER, CLEAR_USER, USER_LOGOUT } from './consts';
import { UserState } from './interface';

export interface SetUser {
  payload: Partial<UserState>;
  type: SET_USER;
}

export interface ClearUser {
  type: CLEAR_USER;
}

export interface UserLogout {
  type: USER_LOGOUT;
}

export type UserActions = SetUser | ClearUser | UserLogout;

export const addUser = (user: Partial<UserState>): SetUser => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = (): ClearUser => ({
  type: CLEAR_USER,
});

export const userLogout = (): UserLogout => ({
  type: USER_LOGOUT,
});
