import { store } from './store';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlices';

export const rootReducer = combineReducers({
  auth: authReducer,
});

/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
