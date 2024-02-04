import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config, handleResponse } from '../../utils/api/api';
import { TBodyRequestChangeIPR, TResponseChangeIPR, TResponseGetIPRById, T_IPR } from '../../utils/api/types';

export const getIPRById = createAsyncThunk(
  'singleIPR/getById',
  (id: string) => {
    return fetch(
      `${config.baseUrl}/iprs/subordinates/${id}/}`,
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
      `${config.baseUrl}/iprs/subordinates/${data.id}/}`,
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

type TSingleIPRInitialState = {
  currentIPR: null | T_IPR;
  singleIPRPending: boolean;
  singleIPRSuccess: null | boolean;
  error: unknown;
};

const initialState: TSingleIPRInitialState = {
  currentIPR: null,
  singleIPRPending: false,
  singleIPRSuccess: null,
  error: '',
}

const singleIPRSlice = createSlice({
  name: 'singleIPR',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getIPRById.pending, (state) => {
      state.error = '';
      state.singleIPRPending = true;
      state.singleIPRSuccess = null;
    })
    builder.addCase(getIPRById.fulfilled, (state, action) => {
      state.singleIPRPending = false;
      state.singleIPRSuccess = true;
      state.currentIPR = action.payload;
    })
    builder.addCase(getIPRById.rejected, (state, action) => {
      state.error = action;
      state.singleIPRPending = false;
      state.singleIPRSuccess = false;
    })

    builder.addCase(updateIPRById.pending, (state) => {
      state.error = '';
      state.singleIPRPending = true;
      state.singleIPRSuccess = null;
    })
    builder.addCase(updateIPRById.fulfilled, (state, action) => {
      state.singleIPRPending = false;
      state.singleIPRSuccess = true;
      state.currentIPR = action.payload;
    })
    builder.addCase(updateIPRById.rejected, (state, action) => {
      state.error = action;
      state.singleIPRPending = false;
      state.singleIPRSuccess = false;
    })
  }
});

export default singleIPRSlice.reducer;
