import { config, handleResponse } from "../../utils/api/api";
import { TResponseGetSomeUser, TResponseLogin, TResponseUsersMe, TUser } from "../../utils/api/types";
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

/**
 * Очищает: стейт списка пользователей на выбор, текущего юзера, токены.
 * Получает с сервера новые токены
 */
export function login(username: string, password: string, signal?: AbortSignal) {
  return (dispatch: AppDispatch) => {

    dispatch(setAuthPending(true));
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
        // записали данные о текущем пользователе
        dispatch(setUser({ ...data, isSuperior: data.subordinates.length > 0 ? true : false }));
        dispatch(setUserSuccess(true));
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
  return (dispatch: AppDispatch) => {
    dispatch(setAuthPending(true));
    const myToken = localStorage.getItem('accessToken');
    if (myToken) {
      dispatch(getUser(signal))
        .catch(err => {
          // localStorage.removeItem('accessToken');
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
