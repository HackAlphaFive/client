import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const getUserSuccess = (state: RootState) => state.auth.userSuccess;
export const getUserPending = (state: RootState) => state.auth.userPending;

export const getUserFromState = (state: RootState) => state.auth.user;

const getFirstName = (state: RootState) => state.auth.user?.first_name;
const getLastName = (state: RootState) => state.auth.user?.last_name;
const getPatronymic = (state: RootState) => state.auth.user?.patronymic;
const getUserPosition = (state: RootState) => state.auth.user?.position;
const getUserPhoto = (state: RootState) => state.auth.user?.photo;
const getUserId = (state: RootState) => state.auth.user?.id;

export const getUserSimplified = createSelector(
  [getFirstName, getLastName, getPatronymic, getUserPosition, getUserPhoto, getUserId],
  (firstName, lastName, patronymic, position, photo, id) => ({
    fullname: `${lastName} ${firstName} ${patronymic ?? ''}`,
    position,
    photo,
    id,
  })
);

export const getAnotherUsersFromState = (state: RootState) => state.auth.anotherUsers;

export const getAuthSuccess = (state: RootState) => state.auth.authSuccess;
export const getAuthPending = (state: RootState) => state.auth.authPending;

/**
 * @description является ли руководителем текущий юзер
 * @description TODO нейминг некорректный? Нужно isUserSuperior например??
 */
export const getUserRole = (state: RootState) => state.auth.user?.isSuperior;

