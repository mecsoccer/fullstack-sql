import { configureStore } from '@reduxjs/toolkit';
import axiosMiddleware from 'redux-axios-middleware';
import { rootReducer } from './reducers';
import { AsteroidsState } from './reducers/asteroids/asteroids.reducer';
import { UserState } from './reducers/user/user.reducer';
import instance from 'services/api';

export interface AppState {
  asteroids: AsteroidsState;
  user: UserState;
}
export const store = configureStore({
  reducer: rootReducer,
  middleware: [axiosMiddleware(instance)],
});

export type AppDispatch = typeof store.dispatch;
