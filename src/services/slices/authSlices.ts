import { createSlice } from "@reduxjs/toolkit";

type TAuthInitialState = {
  // TODO: TUser
  user: string | null;
  error: unknown;
  userPending: boolean;
  userSuccess: boolean | null;
  authPending: boolean | null;
  logOutPending: boolean,
  logOutSuccess: boolean | null;
};

const authInitialState: TAuthInitialState = {
  user: null,
  error: '',
  userPending: false,
  userSuccess: null,
  authPending: null,
  logOutPending: false,
  logOutSuccess: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
});

export default authSlice.reducer;
