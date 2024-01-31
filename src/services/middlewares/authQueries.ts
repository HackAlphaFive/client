import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TResponseGetSomeUser, TResponseLogin, TResponseUsersMe } from "../../utils/api/types";
import { handleError } from "../../utils/utils";
import { clearError, setAnotherUsers, setAuthPending, setAuthSuccess, setUser, setUserPending, setUserSuccess } from "../slices/authSlices";
import { AppDispatch } from "../types";

export function login(username: string, password: string, signal?: AbortSignal) {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthPending(true));
    return fetch(
      `${config.baseUrl}/auth/`,
      {
        signal,
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          username: username,
          password: password
        }),
      }
    )
      .then(handleResponse<TResponseLogin>)
      .then(data => {
        localStorage.setItem('accessToken', `Bearer ${data.token}`);
        dispatch(setAuthSuccess(true));
      })
      .catch(err => {
        dispatch(setAuthSuccess(false));
        handleError('Ошибка при получении токена: ', err)
      })
      .finally(() => {
        dispatch(setAuthPending(false));
      });
  }
}

// вызывается внутри checkUserAuth
export function getUser(signal?: AbortSignal) {
  return (dispatch: AppDispatch) => {
    dispatch(setUserPending(true));
    return fetch(
      `${config.baseUrl}/users/me/`,
      {
        signal,
        method: 'GET',
        headers: {
        // 'Content-Type': 'application/json', - так ругается
        ...config.headers, // а так нет
        authorization: localStorage.getItem('accessToken')!,
        }
      }
    )
      .then(res => {
        return handleResponse<TResponseUsersMe>(res);
      })
      .then(data => {
        dispatch(clearError());
        dispatch(setUser({...data, isSuperior: data.subordinates.length > 0 ? true : false }));
        dispatch(setUserSuccess(true));
      });
      // нет catch, т.к. он есть в checkUserAuth
  };
}

export const getAnotherUser = createAsyncThunk(
  'auth/getAnotherUser',
  (payload: {id: number; signal?: AbortSignal}) => {
    console.log('запрос');
    return fetch(
      `${config.baseUrl}/users/${payload.id}/`,
      {
        signal: payload.signal,
        method: 'GET',
        headers: {
        ...config.headers,
        authorization: localStorage.getItem('accessToken')!,
        }
      }
    )
      .then(handleResponse<TResponseGetSomeUser>);
  }
);

// вызывается при монтировании App
export function checkUserAuth(signal?: AbortSignal) {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthPending(true));
    const myToken = localStorage.getItem('accessToken');
    if (myToken) {
      dispatch(getUser(signal))
        .catch(err => {
          localStorage.removeItem('accessToken');
          dispatch(setUser(null));
          dispatch(setUserSuccess(false));
          handleError('Ошибка при получении данных пользователя: ', err);
        })
        .finally(() => {
          dispatch(setAuthPending(false));
          dispatch(setUserPending(false));
        });
    } else {
      dispatch(setAuthPending(false));
      dispatch(setUser(null));
    }
  };
}
