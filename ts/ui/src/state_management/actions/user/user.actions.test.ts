import { loginUser } from "./user.action";
import {UserActionTypes} from "./actionTypes";

const userLogin = { email: '', password: '' }

describe('Users actions', () => {
  test('loginUser', () => {
    expect(loginUser(userLogin)).toEqual( {
      type: UserActionTypes.LOGIN_USER,
      payload:  {
        request:  {
          method: "post",
          url: "/login",
          data: userLogin,
        },
      },
    });
  });
});