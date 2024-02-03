import { createSlice } from "@reduxjs/toolkit";
import { TResponseIPRsForSubord, TResponseIPRsMy } from "../../utils/api/types";
import { getMyIPRs, getSubordIPRs } from "../middlewares/IPRsQueries";

type TIPRsInitialState = {
  error: unknown;
  myIPRsPending: boolean;
  myIPRsSuccess: null | boolean;
  myIPRs: TResponseIPRsMy,
  subordIPRsPending: boolean;
  subordIPRsSuccess: null | boolean;
  subordIPRs: TResponseIPRsForSubord;
};

const emptyIPRs = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

const IPRsInitialState: TIPRsInitialState = {
  error: '',
  myIPRsPending: false,
  myIPRsSuccess: null,
  myIPRs: emptyIPRs,
  subordIPRsPending: false,
  subordIPRsSuccess: null,
  subordIPRs: emptyIPRs,
}

const IPRsSlice = createSlice({
  name: 'iprs',
  initialState: IPRsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMyIPRs.pending, (state) => {
      state.error = '';
      state.myIPRsSuccess = null;
      state.myIPRsPending = true;
    })
    builder.addCase(getMyIPRs.fulfilled, (state, action) => {
      state.myIPRsSuccess = true;
      state.myIPRsPending = false;
      state.myIPRs = action.payload;
    })
    builder.addCase(getMyIPRs.rejected, (state, action) => {
      state.error = action;
      state.myIPRsSuccess = false;
      state.myIPRsPending = false;
    })

    builder.addCase(getSubordIPRs.pending, (state) => {
      state.error = '';
      state.subordIPRsSuccess = null;
      state.subordIPRsPending = true;
    })
    builder.addCase(getSubordIPRs.fulfilled, (state, action) => {
      state.subordIPRsSuccess = true;
      state.subordIPRsPending = false;
      state.subordIPRs = action.payload;
    })
    builder.addCase(getSubordIPRs.rejected, (state, action) => {
      state.error = action;
      state.subordIPRsSuccess = false;
      state.subordIPRsPending = false;
    })
  }
});

export const {

} = IPRsSlice.actions;
export default IPRsSlice.reducer;