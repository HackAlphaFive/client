export const config = {
  baseUrl: 'https://alfahackathon.hopto.org/api/v1',
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
