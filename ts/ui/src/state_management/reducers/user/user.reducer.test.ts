import UserReducer, { initialState } from './user.reducer';

describe('User Reducer', () => {
  test('default', () => {
    expect(UserReducer(initialState, {} as never)).toEqual(initialState);
  });

  test('missing state', () => {
    expect(UserReducer(undefined, {} as never)).toEqual(initialState);
  });
});
