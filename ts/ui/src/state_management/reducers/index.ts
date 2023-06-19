import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './asteroids/asteroids.reducer';
import notificationReducer from './notification/notification.reducer';
import UserReducer from './user/user.reducer';

export const rootReducer = combineReducers({
  asteroids: postsReducer,
  notification: notificationReducer,
  user: UserReducer,
});
