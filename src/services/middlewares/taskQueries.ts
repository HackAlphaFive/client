import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import {
  TBodyRequestChangeTaskEmployee,
  TBodyRequestChangeTaskSuperior,
  TBodyRequestCreateTask,
  TResponseChangeTask,
  TResponseCreateTask,
  TResponseGetTasks,
} from "../../utils/api/types";

export const getTaskByIdIPR = createAsyncThunk(
  "task/getTaskByIdIPR",
  (iprId) => {
    return fetch(`${config.baseUrl}/iprs/${iprId}/tasks/`, {
      method: "GET",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
    }).then(handleResponse<TResponseGetTasks>);
  }
);

export const postTask = createAsyncThunk(
  "task/postTask",
  (payload: TBodyRequestCreateTask) => {
    return fetch(`${config.baseUrl}/iprs/${payload.ipr}/tasks/`, {
      method: "POST",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        start_date: payload.start_date,
        end_date: payload.end_date,
        ipr: payload.ipr,
      }),
    }).then(handleResponse<TResponseCreateTask>);
  }
);

export const patchTaskBySuperior = createAsyncThunk(
  "task/patchTaskBySuperior",
  (payload: TBodyRequestChangeTaskSuperior & {iprId: string, taskId:string}) => {
    return fetch(`${config.baseUrl}/iprs/${payload.iprId}/tasks/${payload.taskId}/`, {
      method: "PATCH",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        status: payload.status,
        start_date: payload.start_date,
        end_date: payload.end_date,
      })
    }).then(handleResponse<TResponseChangeTask>)
  }
);

export const patchTaskByEmployee = createAsyncThunk(
  "task/patchTaskByEmployee",
  (payload: TBodyRequestChangeTaskEmployee & {iprId: string, taskId:string}) => {
    return fetch(`${config.baseUrl}/iprs/${payload.iprId}/tasks/${payload.taskId}/`, {
      method: "PATCH",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify({
        status: payload.status,
      })
    }).then(handleResponse<TResponseChangeTask>)
  }
);
