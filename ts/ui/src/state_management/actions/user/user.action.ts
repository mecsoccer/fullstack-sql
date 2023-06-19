import { IUser, SignupForm } from 'modals/user/Modals';
import { LoginUserAction, SignupUserAction, UserActionTypes, AuthLoadingAction } from './actionTypes';

export const signupUser = (data: SignupForm): SignupUserAction => {
  return {
    type: UserActionTypes.SIGNUP_USER,
    payload: {
      request: {
        method: 'post',
        url: '/signup',
        data
      },
    },
  };
};

export const loginUser = (data: Pick<IUser, 'email' | 'password'>): LoginUserAction => {
  return {
    type: UserActionTypes.LOGIN_USER,
    payload: {
      request: {
        method: 'post',
        url: '/login',
        data
      },
    },
  };
};

export const authSignalLoading = (status: boolean): AuthLoadingAction => {
  return {
    type: UserActionTypes.AUTH_LOADING,
    payload: status
  }
};
