import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TResponseGetSubordinate, TUser } from "../../utils/api/types";
import { getAnotherUser, getSubordinates } from "../middlewares/authQueries";

type TAuthInitialState = {
  user: TUser | null;
  anotherUsers: Array<TUser>;
  error: unknown;
  userPending: boolean;
  userSuccess: boolean | null;
  authPending: boolean;
  authSuccess: boolean | null;
  subordinates: TResponseGetSubordinate;
  subordPending: boolean;
  subordSuccess: null | boolean;
};

const authInitialState: TAuthInitialState = {
  user: null,
  anotherUsers: [],
  error: '',
  userPending: false,
  userSuccess: null,
  authPending: false,
  authSuccess: null,
  subordinates: [],
  subordPending: false,
  subordSuccess: null,
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
      if (Array.isArray(action.payload) && state.anotherUsers.length === 4) {
        state.anotherUsers = [ ...state.anotherUsers ];
      } else if (Array.isArray(action.payload)) {
        state.anotherUsers = [ ...state.anotherUsers, ...action.payload ];
      } else { // иначе в функцию передан одиночный юзер
        const userCurrent = action.payload; // TS не может сразу определить, что будет не массив. Записал в переменную
        if (!state.anotherUsers.some(user => user.id === userCurrent.id)) { // иногда текущий юзер записывается в список на свитч дважды - это фиксится данной строкой
          state.anotherUsers = [ ...state.anotherUsers, action.payload ];
        }
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
  extraReducers: builder => {
    builder.addCase(getSubordinates.pending, (state) => {
      state.error = '';
      state.subordPending = true;
      state.subordSuccess = null;
    })
    builder.addCase(getSubordinates.fulfilled, (state, action) => {
      state.subordinates = action.payload;
      state.subordPending = false;
      state.subordSuccess = true;
    })
    builder.addCase(getSubordinates.rejected, (state, action) => {
      state.error = action.payload;
      state.subordPending = false;
      state.subordSuccess = false;
    })
  }
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
