import { IUser } from 'modals/user/Modals';
import { UserActions, UserActionTypes } from 'state_management/actions/user/actionTypes';

export interface UserState {
  data: IUser | null;
  loading: false;
  accessToken: string | null;
  token: string | null;
}
export const initialState: UserState = {
  data: null,
  loading: false,
  accessToken: null,
  token: null,
};

const UserReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case UserActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.data.accessToken,
        token: action.payload.data.token
      };

    case UserActionTypes.SIGNUP_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.data.accessToken,
        token: action.payload.data.token
      };

    case UserActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false
      };

    case UserActionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default UserReducer;
