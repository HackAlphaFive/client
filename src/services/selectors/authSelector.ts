import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const getUserSuccess = (state: RootState) => state.auth.userSuccess;
export const getUserPending = (state: RootState) => state.auth.userPending;

export const getUserFromState = (state: RootState) => state.auth.user;

export const getUserSimplified = (state: RootState) => {
  return {
    fullname: `${state.auth.user?.last_name} ${state.auth.user?.first_name} ${state.auth.user?.patronymic}`,
    position: state.auth.user?.position,
    photo: state.auth.user?.photo,
    id: state.auth.user?.id,
  }
};

/*
const getFirstName = (state: RootState) => state.auth.user?.first_name;
const getLastName = (state: RootState) => state.auth.user?.last_name;
const getPatronymic = (state: RootState) => state.auth.user?.patronymic;
const getUserPosition = (state: RootState) => state.auth.user?.position;
const getUserPhoto = (state: RootState) => state.auth.user?.photo;
const getUserId = (state: RootState) => state.auth.user?.id;
*/

export const getAnotherUsersFromState = (state: RootState) => state.auth.anotherUsers;

export const getAuthSuccess = (state: RootState) => state.auth.authSuccess;
export const getAuthPending = (state: RootState) => state.auth.authPending;

/**
 * является ли руководителем текущий юзер
 */
export const getUserRole = (state: RootState) => state.auth.user?.isSuperior;

