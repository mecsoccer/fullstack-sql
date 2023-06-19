import { IAsteroid } from 'modals/asteroids/Modals';
import { AsteroidsActions, AsteroidsActionTypes } from 'state_management/actions/asteroids/actionTypes';

export interface AsteroidsState {
  asteroidsList: Array<IAsteroid>;
  selectedAsteroid: IAsteroid | null;
  loadedFromBE: boolean;
}
export const initialState: AsteroidsState = {
  asteroidsList: [],
  selectedAsteroid: null,
  loadedFromBE: false
};

const PostReducer = (state = initialState, action: AsteroidsActions) => {
  switch (action.type) {
    case AsteroidsActionTypes.GET_ALL_ASTEROIDS_SUCCESS:
      return {
        ...state,
        asteroidsList: action.payload.data,
        loadedFromBE: true,
      };

    case AsteroidsActionTypes.GET_ASTEROID_BY_ID_SUCCESS:
      return {
        ...state,
        selectedAsteroid: action.payload.data,
      };

    case AsteroidsActionTypes.GET_ALL_FAVORITES_SUCCESS:
      return {
        ...state,
        asteroidsList: action.payload.data,
      };

    case AsteroidsActionTypes.MARK_AS_FAVORITE_SUCCESS:
      return state;

    case AsteroidsActionTypes.REMOVE_FAVORITE_SUCCESS:
      return state;

    default:
      return state;
  }
};

export default PostReducer;
