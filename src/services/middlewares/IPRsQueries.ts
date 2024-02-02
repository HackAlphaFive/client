import { createAsyncThunk } from "@reduxjs/toolkit";
import { config, handleResponse } from "../../utils/api/api";
import { TResponseIPRsMy } from "../../utils/api/types";

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
