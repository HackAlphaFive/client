import { config, handleResponse } from "../../utils/api/api";
import { TResponseGetSomeUser, TResponseGetSubordinate, TResponseLogin, TResponseUsersMe, TUser } from "../../utils/api/types";
import { handleError } from "../../utils/utils";
import { clearAnotherUsers,
  clearError,
  setAnotherUsers,
  setAuthPending,
  setAuthSuccess,
  setUser,
  setUserPending,
  setUserSuccess } from "../slices/authSlice";
import { AppDispatch } from "../types";
import { USERS } from "../../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Очищает: стейт списка пользователей на выбор, текущего юзера, токены.
 * Получает с сервера новые токены
 */
export function getToken(username: string, password: string, signal?: AbortSignal) {
  console.log('getToken запуск - на получение токена');
  return (dispatch: AppDispatch) => {

    dispatch(setAuthPending(true));
    dispatch(setAuthSuccess(null));
    dispatch(clearAnotherUsers());
    dispatch(setUser(null));
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

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
        console.log('getToken поставлен токен');
        localStorage.setItem('accessToken', `Bearer ${data.token}`);
        dispatch(setAuthSuccess(true));
      })
      .catch(err => {
        dispatch(setAuthSuccess(false));
        handleError('Ошибка при получении токена: ', err)
      })
      .finally(() => {
        console.log('getToken завершение');
        dispatch(setAuthPending(false));
      });
  }
}

/**
 * @param id искомого пользователя
 * @description need accessToken
 */
export const getAnotherUser = (id: number, signal?: AbortSignal) => {
  return fetch(`${config.baseUrl}/users/${id}/`, {
    signal: signal,
    method: 'GET',
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken')!,
    }
  }
  )
    .then(handleResponse<TResponseGetSomeUser>);
};

// вызывается внутри checkUserAuth
export function getUser(signal?: AbortSignal) {
  console.log('getUser запуск');
  return (dispatch: AppDispatch) => {
    dispatch(setUserPending(true));
    return fetch(
      `${config.baseUrl}/users/me/`,
      {
        signal,
        method: 'GET',
        headers: {
        // 'Content-Type': 'application/json', // так ругается
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
        console.log('getUser записал юзера в стейт');
        // записали данные о текущем пользователе
        dispatch(setUser({ ...data, isSuperior: data.subordinates.length > 0 ? true : false }));
        dispatch(setUserSuccess(true));
        dispatch(setAuthSuccess(true));
      });
      // нет catch, т.к. он есть в checkUserAuth
  };
}

/**
 * @param currentUser текущий юзер, для которого получен токен и данные аккаунта
 * @description Ф-ия заполняет стейт вариантами юзеров, на которых можно свичнуться
 */
export function setAnotherUsersInState (currentUser: TUser, signal?: AbortSignal) {
  return (dispatch: AppDispatch) => {
    const idsArray = USERS.map(user => user.id);
    const idsForSearching = idsArray.filter(id => currentUser.id !== id);

    dispatch(setAnotherUsers(currentUser));

    return Promise.all(idsForSearching.map( id => getAnotherUser(id, signal) ))
      .then((result) => {
        const resultWithStatus = result.map(user => ({...user, isSuperior: user.subordinates.length > 0 ? true : false }))
        dispatch(setAnotherUsers(resultWithStatus));
      })
      .catch(handleError)
  }
}

//
/**
 * Вызывается при монтировании App. Делает запрос за юзером по текущему токену
 * и сохраняет его в стейт. Может очищать стейт юзера!
 */
export function checkUserAuth(signal?: AbortSignal) {
  console.log('checkUserAuth запуск');
  return (dispatch: AppDispatch) => {
    dispatch(setAuthPending(true));
    const myToken = localStorage.getItem('accessToken');
    if (myToken) {
      console.log('checkUserAuth if true токен имеется');
      dispatch(getUser(signal))
        .catch(err => {
          console.log('checkUserAuth, catch err, удаляю токен');
          localStorage.removeItem('accessToken');
          console.log('checkUserAuth, catch err, зануляю стейт юзера');
          dispatch(setUser(null));
          dispatch(setUserSuccess(false));
          handleError('checkUserAuth catch handleError --→: ', err);
        })
        .finally(() => {
          console.log('checkUserAuth заверешение, auth&user pending → false');
          dispatch(setAuthPending(false));
          dispatch(setUserPending(false));
        });
    } else {
      console.log('checkUserAuth else, нет токена, зануляю стейт юзера');
      dispatch(setAuthPending(false));
      dispatch(setAuthSuccess(false));
      dispatch(setUser(null));
    }
  };
}

/*export const getSubordinates = createAsyncThunk(
  'auth/getSubordinates',
  () => {

    let result: TResponseGetSubordinate['results'] = [];
    let next: string | null;

    const options = {
      method: 'GET',
      headers: {
        ...config.headers,
        authorization: localStorage.getItem('accessToken')!,
      },
    }

    return fetch(`${config.baseUrl}/users/get_subordinates/${query}`, options)
    .then(handleResponse<TResponseGetSubordinate>)
    .then((data) => {
      result = [...data.results];
      if (data.next) {
        fetch(data.next, options).then(handleResponse<TResponseGetSubordinate>)
      }
    })

  }
);*/

export const getSubordinates = createAsyncThunk(
  'auth/getSubordinates',
  () => {
    return fetch(
      `${config.baseUrl}/users/get_subordinates/`,
      {
        method: 'GET',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
      }
    )
    .then(handleResponse<TResponseGetSubordinate>)
  }
);

export const getUserById = createAsyncThunk('auth/getUserById', (id: number | string) => {
  return fetch(`${config.baseUrl}/users/${id}/`, {
    method: 'GET',
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken')!,
    }
  }
  )
    .then(handleResponse<TResponseGetSomeUser>);
});
