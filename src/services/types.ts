import { store } from './store';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlices';
import taskReducer from './slices/taskSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
