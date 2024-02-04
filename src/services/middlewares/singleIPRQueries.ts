import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TBodyRequestChangeIPR, TBodyRequestCreateIPR, TResponseChangeIPR, TResponseCreateIPR, TResponseGetIPRById } from "../../utils/api/types";

type TGetIPRPayload = {
  isSuperior: boolean;
  id: string | number;
};

export const getIPRById = createAsyncThunk(
  'singleIPR/getById',
  (payload: TGetIPRPayload) => {
    const path = payload.isSuperior ? 'subordinates' : 'my';
    return fetch(
      `${config.baseUrl}/iprs/${path}/${payload.id}/`,
      {
        method: 'GET',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
      }
    )
      .then(handleResponse<TResponseGetIPRById>)
  }
);

export const updateIPRById = createAsyncThunk(
  'singleIPR/updateById',
  (data: { body: TBodyRequestChangeIPR; id: string | number }) => {
    return fetch(
      `${config.baseUrl}/iprs/subordinates/${data.id}/`,
      {
        method: 'PATCH',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify(data.body),
      }
    )
      .then(handleResponse<TResponseChangeIPR>)
  }
);

export const createIPR = createAsyncThunk(
  'singleIPR/createIPR',
  (data: TBodyRequestCreateIPR) => {
    return fetch(
      `${config.baseUrl}/iprs/subordinates/`,
      {
        method: 'POST',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify(data),
      }
    )
      .then(handleResponse<TResponseCreateIPR>)
  }
);
