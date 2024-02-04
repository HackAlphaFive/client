import { store } from './store';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice'
import IPRsReducer from './slices/IPRsSlice';
import commentsReducer from './slices/commenstSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  iprs: IPRsReducer,
  task: taskReducer,
  comments: commentsReducer,
});

/**
 * Типизация всего хранилища
 */
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
