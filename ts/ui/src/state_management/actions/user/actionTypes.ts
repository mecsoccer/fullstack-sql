import { AxiosErrorPayload, AxiosRequestPayload, AxiosSuccessPayload } from 'modals/axios/Modals';
import { IUser, AuthSuccessPayload } from 'modals/user/Modals';

export enum UserActionTypes {
  GET_USER_BY_ID = 'GET_USER_BY_ID',
  GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS',
  GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL',
  SIGNUP_USER = 'SIGNUP_USER',
  SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS',
  SIGNUP_USER_FAIL = 'SIGNUP_USER_FAIL',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL = 'LOGIN_USER_FAIL',
  AUTH_LOADING = 'AUTH_LOADING',
}

export interface AuthLoadingAction {
  type: UserActionTypes.AUTH_LOADING,
  payload: boolean
}

export interface SignupUserAction extends AxiosRequestPayload {
  type: UserActionTypes.SIGNUP_USER;
}

export interface SignupUserActionSuccess
  extends AxiosSuccessPayload<AuthSuccessPayload, UserActionTypes.SIGNUP_USER_SUCCESS, SignupUserAction> {
  type: UserActionTypes.SIGNUP_USER_SUCCESS;
}

export interface SignupUserActionFail
  extends AxiosErrorPayload<UserActionTypes.SIGNUP_USER_FAIL, SignupUserAction> {
  type: UserActionTypes.SIGNUP_USER_FAIL;
}

export interface LoginUserAction extends AxiosRequestPayload {
  type: UserActionTypes.LOGIN_USER;
}

export interface LoginUserActionSuccess
  extends AxiosSuccessPayload<AuthSuccessPayload, UserActionTypes.LOGIN_USER_SUCCESS, LoginUserAction> {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
}

export interface LoginUserActionFail
  extends AxiosErrorPayload<UserActionTypes.LOGIN_USER_FAIL, LoginUserAction> {
  type: UserActionTypes.LOGIN_USER_FAIL;
}

export interface GetUserByIdAction extends AxiosRequestPayload {
  type: UserActionTypes.GET_USER_BY_ID;
}

export interface GetUserByIdActionSuccess
  extends AxiosSuccessPayload<IUser, UserActionTypes.GET_USER_BY_ID_SUCCESS, GetUserByIdAction> {
  type: UserActionTypes.GET_USER_BY_ID_SUCCESS;
}

export interface GetUserByIdActionFail
  extends AxiosErrorPayload<UserActionTypes.GET_USER_BY_ID_FAIL, GetUserByIdAction> {
  type: UserActionTypes.GET_USER_BY_ID_FAIL;
}

export type UserActions =
  | AuthLoadingAction
  | SignupUserAction
  | SignupUserActionSuccess
  | SignupUserActionFail
  | LoginUserAction
  | LoginUserActionSuccess
  | LoginUserActionFail
  | GetUserByIdAction
  | GetUserByIdActionSuccess
  | GetUserByIdActionFail;
