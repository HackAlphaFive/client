import { RootState } from "../types";

export const getUserSuccess = (state: RootState) => state.auth.userSuccess;
export const getUserPending = (state: RootState) => state.auth.userPending;
export const getUserFromState = (state: RootState) => state.auth.user;
export const getAnotherUsersFromState = (state: RootState) => state.auth.anotherUsers;

export const getAuthSuccess = (state: RootState) => state.auth.authSuccess;
export const getAuthPending = (state: RootState) => state.auth.authPending;
