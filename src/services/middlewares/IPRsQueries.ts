import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TResponseIPRsForSubord, TResponseIPRsMy } from "../../utils/api/types";

export const getMyIPRs = createAsyncThunk(
  'iprs/getMyIPRs',
  () => {
    return fetch(
      `${config.baseUrl}/iprs/my/`,
      {
        method: 'GET',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
      }
    )
      .then(handleResponse<TResponseIPRsMy>)
  }
);

export const getSubordIPRs = createAsyncThunk(
  'iprs/getSubordIPRs',
  () => {
    return fetch(
      `${config.baseUrl}/iprs/subordinates/`,
      {
        method: 'GET',
        headers: {
          ...config.headers,
          authorization: localStorage.getItem('accessToken')!,
        },
      }
    )
      .then(handleResponse<TResponseIPRsForSubord>)
  }
);
