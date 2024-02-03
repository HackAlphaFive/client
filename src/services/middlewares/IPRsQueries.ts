import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, getQueryString, handleResponse } from "../../utils/api/api";
import { TResponseIPRsForSubord, TResponseIPRsMy, T_IPR_query } from "../../utils/api/types";

export const getMyIPRs = createAsyncThunk(
  'iprs/getMyIPRs',
  (payload?: T_IPR_query) => {
    return fetch(
      `${config.baseUrl}/iprs/my/${getQueryString(payload)}`,
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
  (payload?: T_IPR_query) => {
    return fetch(
      `${config.baseUrl}/iprs/subordinates/${getQueryString(payload)}`,
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
