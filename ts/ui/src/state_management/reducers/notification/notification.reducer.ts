import { AsteroidsActions, AsteroidsActionTypes } from 'state_management/actions/asteroids/actionTypes';
import { NotificationActions, NotificationActionTypes } from 'state_management/actions/notification/actionTypes';
import { UserActions, UserActionTypes } from 'state_management/actions/user/actionTypes';

export interface NotificationState {
  open: boolean;
}
export const initialState: NotificationState = {
  open: false,
};

const NotificationReducer =
(state: NotificationState = initialState, action: UserActions | AsteroidsActions | NotificationActions) => {
  switch (action.type) {
    case AsteroidsActionTypes.GET_ALL_ASTEROIDS_FAIL:
    case AsteroidsActionTypes.GET_ASTEROID_BY_ID_FAIL:
    case AsteroidsActionTypes.GET_ALL_FAVORITES_FAIL:
    case AsteroidsActionTypes.MARK_AS_FAVORITE_FAIL:
    case AsteroidsActionTypes.REMOVE_FAVORITE_FAIL:
    case UserActionTypes.LOGIN_USER_FAIL:
    case UserActionTypes.SIGNUP_USER_FAIL:
      return {
        ...state,
        open: true,
        // @ts-ignore
        message: action.error.response?.data?.error || action.error.message,
      };

    case NotificationActionTypes.HIDE_ERROR_NOTIFICATION:
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state;
  }
};

export default NotificationReducer;
