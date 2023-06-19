import { AxiosErrorPayload, AxiosRequestPayload, AxiosSuccessPayload } from 'modals/axios/Modals';
import { IAsteroid } from 'modals/asteroids/Modals';

export enum AsteroidsActionTypes {
  GET_ALL_ASTEROIDS = 'GET_ALL_ASTEROIDS',
  GET_ALL_ASTEROIDS_SUCCESS = 'GET_ALL_ASTEROIDS_SUCCESS',
  GET_ALL_ASTEROIDS_FAIL = 'GET_ALL_ASTEROIDS_FAIL',
  GET_ALL_FAVORITES = 'GET_ALL_FAVORITES',
  GET_ALL_FAVORITES_SUCCESS = 'GET_ALL_FAVORITES_SUCCESS',
  GET_ALL_FAVORITES_FAIL = 'GET_ALL_FAVORITES_FAIL',
  MARK_AS_FAVORITE = 'MARK_AS_FAVORITE',
  MARK_AS_FAVORITE_SUCCESS = 'MARK_AS_FAVORITE_SUCCESS',
  MARK_AS_FAVORITE_FAIL = 'MARK_AS_FAVORITE_FAIL',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
  REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS',
  REMOVE_FAVORITE_FAIL = 'REMOVE_FAVORITE_FAIL',
  GET_ASTEROID_BY_ID = 'GET_ASTEROID_BY_ID',
  GET_ASTEROID_BY_ID_SUCCESS = 'GET_ASTEROID_BY_ID_SUCCESS',
  GET_ASTEROID_BY_ID_FAIL = 'GET_ASTEROID_BY_ID_FAIL',
}

export interface GetAllAsteroidsAction extends AxiosRequestPayload {
  type: AsteroidsActionTypes.GET_ALL_ASTEROIDS;
}

export interface GetAllAsteroidsActionSuccess
  extends AxiosSuccessPayload<Array<IAsteroid>, AsteroidsActionTypes.GET_ALL_ASTEROIDS_SUCCESS, GetAllAsteroidsAction> {
  type: AsteroidsActionTypes.GET_ALL_ASTEROIDS_SUCCESS;
}

export interface GetAllAsteroidsActionFail
  extends AxiosErrorPayload<AsteroidsActionTypes.GET_ALL_ASTEROIDS_FAIL, GetAllAsteroidsAction> {
  type: AsteroidsActionTypes.GET_ALL_ASTEROIDS_FAIL;
}

export interface GetAllFavoritesAction extends AxiosRequestPayload {
  type: AsteroidsActionTypes.GET_ALL_FAVORITES;
}
export interface GetAllFavoritesActionSuccess
  extends AxiosSuccessPayload<Array<IAsteroid>, AsteroidsActionTypes.GET_ALL_FAVORITES_SUCCESS, GetAllFavoritesAction> {
  type: AsteroidsActionTypes.GET_ALL_FAVORITES_SUCCESS;
}
export interface GetAllFavoritesActionFail
  extends AxiosErrorPayload<AsteroidsActionTypes.GET_ALL_FAVORITES_FAIL, GetAllFavoritesAction> {
  type: AsteroidsActionTypes.GET_ALL_FAVORITES_FAIL;
}

export interface MarkAsFavoriteAction extends AxiosRequestPayload {
  type: AsteroidsActionTypes.MARK_AS_FAVORITE;
}
export interface MarkAsFavoriteActionSuccess
  extends AxiosSuccessPayload<Array<IAsteroid>, AsteroidsActionTypes.MARK_AS_FAVORITE_SUCCESS, MarkAsFavoriteAction> {
  type: AsteroidsActionTypes.MARK_AS_FAVORITE_SUCCESS;
}
export interface MarkAsFavoriteActionFail
  extends AxiosErrorPayload<AsteroidsActionTypes.MARK_AS_FAVORITE_FAIL, MarkAsFavoriteAction> {
  type: AsteroidsActionTypes.MARK_AS_FAVORITE_FAIL;
}

export interface RemoveFavoriteAction extends AxiosRequestPayload {
  type: AsteroidsActionTypes.REMOVE_FAVORITE;
}
export interface RemoveFavoriteActionSuccess
  extends AxiosSuccessPayload<Array<IAsteroid>, AsteroidsActionTypes.REMOVE_FAVORITE_SUCCESS, RemoveFavoriteAction> {
  type: AsteroidsActionTypes.REMOVE_FAVORITE_SUCCESS;
}
export interface RemoveFavoriteActionFail
  extends AxiosErrorPayload<AsteroidsActionTypes.REMOVE_FAVORITE_FAIL, RemoveFavoriteAction> {
  type: AsteroidsActionTypes.REMOVE_FAVORITE_FAIL;
}

export interface GetAsteroidByIdAction extends AxiosRequestPayload {
  type: AsteroidsActionTypes.GET_ASTEROID_BY_ID;
}

export interface GetAsteroidByIdActionSuccess
  extends AxiosSuccessPayload<IAsteroid, AsteroidsActionTypes.GET_ASTEROID_BY_ID_SUCCESS, GetAsteroidByIdAction> {
  type: AsteroidsActionTypes.GET_ASTEROID_BY_ID_SUCCESS;
}

export interface GetAsteroidByIdActionFail
  extends AxiosErrorPayload<AsteroidsActionTypes.GET_ASTEROID_BY_ID_FAIL, GetAsteroidByIdAction> {
  type: AsteroidsActionTypes.GET_ASTEROID_BY_ID_FAIL;
}

export type AsteroidsActions =
  | GetAllAsteroidsAction
  | GetAllAsteroidsActionSuccess
  | GetAllAsteroidsActionFail
  | GetAllFavoritesAction
  | GetAllFavoritesActionSuccess
  | GetAllFavoritesActionFail
  | MarkAsFavoriteAction
  | MarkAsFavoriteActionSuccess
  | MarkAsFavoriteActionFail
  | RemoveFavoriteAction
  | RemoveFavoriteActionSuccess
  | RemoveFavoriteActionFail
  | GetAsteroidByIdAction
  | GetAsteroidByIdActionSuccess
  | GetAsteroidByIdActionFail
