import { StatusList } from "../types";
import { T_IPR_query } from "./types";

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

export function getQueryString (data: T_IPR_query) {
  if (data === undefined || Object.entries(data).length === 0) return ''; // сервер сам назначает page=1, если не передать ничего в query

  const { page, status, start, end, lastName } = data;

  let isFirst: boolean = true;

  let _page: string;
  let _status: string;
  let _lastName: string;
  let _start: string;
  let _end: string;

  if (page && isFirst) {
    _page = `page=${page}`;
    isFirst = false;
  } else if (page) {
    _page = `&page=${page}`;
  } else {
    _page = '';
  }

  if (status && isFirst) {
    _status = `status=${status}`;
    isFirst = false;
  } else if (status) {
    _status = `&status=${status}`;
  } else {
    _status = '';
  }

  if (start && isFirst) {
    _start = `start_date=${start}`;
    isFirst = false;
  } else if (start) {
    _start = `&start_date=${start}`;
  } else {
    _start = '';
  }

  if (end && isFirst) {
    _end = `end_date=${end}`;
    isFirst = false;
  } else if (end) {
    _end = `&end_date=${end}`;
  } else {
    _end = '';
  }

  if (lastName && isFirst) {
    _lastName = `employee__last_name=${lastName}`;
    isFirst = false;
  } else if (lastName) {
    _lastName = `&employee__last_name=${lastName}`;
  } else {
    _lastName = '';
  }

  return `?${_page}${_status}${_lastName}${_start}${_end}`;
}
