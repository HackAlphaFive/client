export const config = {
  baseUrl: 'http://80.78.242.89/api/v1',
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  }
};


// Типизировать негативный ответ промиса не нужно, т.к. res.ok = false может быть из-за множества разных причин
export async function handleResponse<T>(response: Response) {
  const data: Promise<T> = await response.json();
  if (response.ok) return data;
  return Promise.reject(data);
}


export const getToken = () => {
  /*return fetch(`${config.baseUrl}/auth/`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      username: 'superior',
      password: 'superhardpassword1'
    }),
  })*/
}
