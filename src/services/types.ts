import { store } from './store';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import IPRsReducer from './slices/IPRsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  iprs: IPRsReducer,
});

/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
