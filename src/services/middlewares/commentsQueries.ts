import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import {
  TBodyRequestCreateComment,
  TResponseCreateComment,
  TResponseGetComments,
} from "../../utils/api/types";

export const getComments = createAsyncThunk("comments/getComments", (id:string | number) => {
  return fetch(`${config.baseUrl}/tasks/${id}/comments/`, {
    method: "GET",
    headers: {
      ...config.headers,
    },
  }).then(handleResponse<TResponseGetComments>);
});

export const postComment = createAsyncThunk(
  "comments/postComment",
  (data: {body: TBodyRequestCreateComment, taskId: string |number}) => {
    return fetch(`${config.baseUrl}/tasks/${data.taskId}/comments/`, {
      method: "POST",
      headers: {
        ...config.headers,
        authorization: localStorage.getItem("accessToken")!,
      },
      body: JSON.stringify(data.body),
    }).then(handleResponse<TResponseCreateComment>);
  }
);
