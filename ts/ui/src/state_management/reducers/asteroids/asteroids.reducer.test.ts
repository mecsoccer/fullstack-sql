import PostsReducer, { initialState } from './asteroids.reducer';

describe('Posts Reducer', () => {
  test('default', () => {
    expect(PostsReducer(initialState, {} as never)).toEqual(initialState);
  });

  test('missing state', () => {
    expect(PostsReducer(undefined, {} as never)).toEqual(initialState);
  });
});
