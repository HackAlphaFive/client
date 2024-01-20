import { TCatcher, TResponseRefreshToken } from "./types";

export const config = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  }
};


// Типизировать негативный ответ промиса не нужно, т.к. res.ok = false может быть из-за множества разных причин
export async function handleResponse<T>(response: Response) {
  const data: Promise<T> = await response.json();
  if (response.ok) return data;
  return Promise.reject(data);
}

export async function fetchWithRefresh<T>(url: string, options: RequestInit, catcher: TCatcher<T>) {
  try {
    const res = await fetch(url, options);
    const data = await handleResponse<T>(res);
    return data;
  } catch (err) {
    // кэтчер (у меня это tokenCatcher) асинхронная функция, потому надо ждать её ответа
    const data = await catcher(url, options, err);
    return data;
  }
}

// Типизировать негативный ответ промиса не нужно, т.к. res.ok = false может быть из-за множества разных причин
export async function tokenCatcher<T>(url: string, options: RequestInit, err: any) {
  if (err.message === 'jwt expired') {
    const refreshData = await refreshToken<TResponseRefreshToken>();

    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }

    localStorage.setItem("accessToken", refreshData.accessToken);
    localStorage.setItem("refreshToken", refreshData.refreshToken);

    // https://stackoverflow.com/questions/67346496/typescript-authorization-does-not-exist-on-type-headersinit
    const headersInit: HeadersInit = {};
    options.headers = headersInit;

    options.headers = { ...config.headers, authorization: refreshData.accessToken };
    const res = await fetch(url, options);
    const data = await handleResponse<T>(res);
    return data;
  } else {
    return Promise.reject(err);
  }
}

export async function refreshToken<T>(): Promise<T> {
  // передаём свой refreshToken, чтобы получить новый accessToken
  return fetch(
    `${config.baseUrl}////`,
    {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      })
    }
  )
    .then(handleResponse<T>);
}
