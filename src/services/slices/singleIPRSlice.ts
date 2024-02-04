import { createSlice } from '@reduxjs/toolkit';
import { T_IPR } from '../../utils/api/types';
import { getIPRById, updateIPRById } from '../middlewares/singleIPRQueries';

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
  reducers: {
    clearCurrentIPR: (state) => {
      state.currentIPR = null;
      state.singleIPRPending = false;
      state.singleIPRSuccess = null;
    },
  },
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


export const {
  clearCurrentIPR,
} = singleIPRSlice.actions;
export default singleIPRSlice.reducer;
