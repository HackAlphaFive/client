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
    setAnotherUsers: (state, action: PayloadAction<TUser>) => {
      state.anotherUsers = [ ...state.anotherUsers, action.payload];
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
    builder.addCase(getAnotherUser.pending, (state) => {
      state.error = '';
      state.userSuccess = null;
      state.userPending = true;
    })
    builder.addCase(getAnotherUser.fulfilled, (state, action) => {
      state.anotherUsers = [...state.anotherUsers, {...action.payload, isSuperior: action.payload.subordinates.length > 0 ? true : false}];
      state.userSuccess = true;
      state.userPending = false;
      console.log('вызов завершен промис разрешен плюсово');
    })
    builder.addCase(getAnotherUser.rejected, (state, action) => {
      state.userSuccess = false;
      state.userPending = false;
      state.error = action.payload;
    })
  }
});

export const {
  setUser,
  setAnotherUsers,
  setError,
  clearError,
  setUserPending,
  setUserSuccess,
  setAuthPending,
  setAuthSuccess,
} = authSlice.actions;
export default authSlice.reducer;
