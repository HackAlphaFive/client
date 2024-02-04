import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, getQueryString, handleResponse } from "../../utils/api/api";
import {
  TBodyRequestChangeTaskEmployee,
  TBodyRequestChangeTaskSuperior,
  TBodyRequestCreateTask,
  TResponseChangeTask,
  TResponseCreateTask,
  TResponseGetTasks,
  T_Task_query,
} from "../../utils/api/types";

export const getTaskByIdIPR = createAsyncThunk(
  "task/getTaskByIdIPR",
  (data: {tasksQuery: T_Task_query, id: number | string}) => {
    return fetch(`${config.baseUrl}/iprs/${data.id}/tasks/${getQueryString(data.tasksQuery)}`, {
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
  (data: { body: TBodyRequestCreateTask; iprId: string | number }) => {
    return fetch(`${config.baseUrl}/iprs/${data.iprId}/tasks/`, {
      method: "POST",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify(data.body),
    }).then(handleResponse<TResponseCreateTask>);
  }
);

export const patchTaskBySuperior = createAsyncThunk(
  "task/patchTaskBySuperior",
  (data: {
    body: TBodyRequestChangeTaskSuperior;
    iprId: string | number;
    taskId: string | number;
  }) => {
    return fetch(`${config.baseUrl}/iprs/${data.iprId}/tasks/${data.taskId}/`, {
      method: "PATCH",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify(data.body),
    }).then(handleResponse<TResponseChangeTask>);
  }
);

export const patchTaskByEmployee = createAsyncThunk(
  "task/patchTaskByEmployee",
  (data: {
    status: string;
    iprId: string | number;
    taskId: string | number;
  }) => {
    return fetch(`${config.baseUrl}/iprs/${data.iprId}/tasks/${data.taskId}/`, {
      method: "PATCH",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify({
        status: data.status,
      }),
    }).then(handleResponse<TResponseChangeTask>);
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  (data: {
    iprId: string | number;
    taskId: string | number;
  }) => {
    return fetch(`${config.baseUrl}/iprs/${data.iprId}/tasks/${data.taskId}/`, {
      method: "DELETE",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
    }).then(handleResponse);
  }
);
