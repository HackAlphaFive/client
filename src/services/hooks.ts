import {
  TypedUseSelectorHook,
  useDispatch as useDispatchOrigin,
  useSelector as useSelectorOrigin
} from 'react-redux';

import { AppDispatch, RootState } from './types';

// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => useDispatchOrigin<AppDispatch>();
