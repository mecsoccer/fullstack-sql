import { GetAllAsteroidsAction, GetAsteroidByIdAction, AsteroidsActionTypes, GetAllFavoritesAction, MarkAsFavoriteAction, RemoveFavoriteAction } from './actionTypes';

interface QueryParams {
  name?: string,
  date_from?: string,
  date_to?: string
}

export const getAllAsteroids = (limit=20, offset=0, params?: QueryParams): GetAllAsteroidsAction => {
  return {
    type: AsteroidsActionTypes.GET_ALL_ASTEROIDS,
    payload: {
      request: {
        method: 'get',
        url: '/asteroids',
        params: { limit, offset, ...params }
      },
    },
  };
};

export const getAllFavorites = (limit=10, offset=0): GetAllFavoritesAction => {
  return {
    type: AsteroidsActionTypes.GET_ALL_FAVORITES,
    payload: {
      request: {
        method: 'get',
        url: '/favorites',
        params: { limit, offset }
      },
    },
  };
};

export const markFavorite = (id: number): MarkAsFavoriteAction => {
  return {
    type: AsteroidsActionTypes.MARK_AS_FAVORITE,
    payload: {
      request: {
        method: 'post',
        url: '/favorites',
        data: { asteroid: id }
      },
    },
  };
};

export const removeFavorite = (id: number): RemoveFavoriteAction => {
  return {
    type: AsteroidsActionTypes.REMOVE_FAVORITE,
    payload: {
      request: {
        method: 'delete',
        url: `/favorites/${id}`,
      },
    },
  };
};

export const getAsteroidById = (id: string): GetAsteroidByIdAction => {
  return {
    type: AsteroidsActionTypes.GET_ASTEROID_BY_ID,
    payload: {
      request: {
        method: 'get',
        url: `/asteroids/${id}`,
      },
    },
  };
};
