import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../utils/api/types";
import { getAnotherUser } from "../middlewares/authQueries";

type TAuthInitialState = {
  user: TUser | null;
  anotherUsers: Array<TUser>;
  error: unknown;
  userPending: boolean;
  userSuccess: boolean | null;
  authPending: boolean;
  authSuccess: boolean | null;
};

const authInitialState: TAuthInitialState = {
  user: null,
  anotherUsers: [],
  error: '',
  userPending: false,
  userSuccess: null,
  authPending: false,
  authSuccess: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    // редьюсер для сохранения других возможных пользователей (в рамках MVP)
    setAnotherUsers: (state, action: PayloadAction<TUser | TUser[]>) => {
      // если payload является массивом, то
      if (Array.isArray(action.payload)) {
        state.anotherUsers = [ ...state.anotherUsers, ...action.payload ]
      } else { // иначе в функцию передан одиночный юзер
        state.anotherUsers = [ ...state.anotherUsers, action.payload ];
      }
    },
    clearAnotherUsers: (state) => {
      state.anotherUsers = authInitialState.anotherUsers;
    },

    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = authInitialState.error;
    },

    setUserPending: (state, action: PayloadAction<boolean>) => {
      state.userPending = action.payload;
    },
    setUserSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.userSuccess = action.payload;
    },

    setAuthPending: (state, action: PayloadAction<boolean>) => {
      state.authPending = action.payload;
    },
    setAuthSuccess: (state, action: PayloadAction<boolean | null>) => {
      state.authSuccess = action.payload;
    },
  },
});

export const {
  setUser,
  setAnotherUsers,
  clearAnotherUsers,
  setError,
  clearError,
  setUserPending,
  setUserSuccess,
  setAuthPending,
  setAuthSuccess,
} = authSlice.actions;
export default authSlice.reducer;
