import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TResponseIPRsForSubord, TResponseIPRsMy } from "../../utils/api/types";
import { getMyIPRs, getSubordIPRs } from "../middlewares/IPRsQueries";
import { StatusList } from "../../utils/types";

type TIPRsInitialState = {
  error: unknown;

  myIPRsPending: boolean;
  myIPRsSuccess: null | boolean;
  myIPRs: TResponseIPRsMy;

  subordIPRsPending: boolean;
  subordIPRsSuccess: null | boolean;
  subordIPRs: TResponseIPRsForSubord;

  filteringIPRStatus: StatusList | null;
  filteringDateStart: string | null;
  filteringDateEnd: string | null;
  filteringPage: number | null;
  filteringSubordLastName: string | null;
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
  filteringIPRStatus: null,
  filteringDateStart: null,
  filteringDateEnd: null,
  filteringPage: null,
  filteringSubordLastName: null,
}

const IPRsSlice = createSlice({
  name: 'iprs',
  initialState: IPRsInitialState,
  reducers: {
    setFilteringIPRStatus: (state, action: PayloadAction<StatusList>) => {
      state.filteringIPRStatus = action.payload;
    },
    clearFilteringIPRStatus: (state) => {
      state.filteringIPRStatus = IPRsInitialState.filteringIPRStatus;
    },

    setFilteringDateStart: (state, action: PayloadAction<string>) => {
      state.filteringDateStart = action.payload;
    },
    clearFilteringDateStart: (state) => {
      state.filteringDateStart = IPRsInitialState.filteringDateStart;
    },

    setFilteringDateEnd: (state, action: PayloadAction<string>) => {
      state.filteringDateEnd = action.payload;
    },
    clearFilteringDateEnd: (state) => {
      state.filteringDateEnd = IPRsInitialState.filteringDateEnd;
    },

    setFilteringPage: (state, action: PayloadAction<number>) => {
      state.filteringPage = action.payload;
    },
    clearFilteringPage: (state) => {
      state.filteringPage = IPRsInitialState.filteringPage;
    },

    setFilteringSubordLastName: (state, action: PayloadAction<string>) => {
      state.filteringSubordLastName = action.payload;
    },
    clearFilteringSubordLastName: (state) => {
      state.filteringSubordLastName = IPRsInitialState.filteringSubordLastName;
    },

    clearFilter: (state) => {
      state.filteringIPRStatus = IPRsInitialState.filteringIPRStatus;
      state.filteringDateStart = IPRsInitialState.filteringDateStart;
      state.filteringDateEnd = IPRsInitialState.filteringDateEnd;
      state.filteringPage = IPRsInitialState.filteringPage;
      state.filteringSubordLastName = IPRsInitialState.filteringSubordLastName;
    },
  },
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
  setFilteringIPRStatus,
  clearFilteringIPRStatus,
  setFilteringDateStart,
  clearFilteringDateStart,
  setFilteringDateEnd,
  clearFilteringDateEnd,
  setFilteringSubordLastName,
  clearFilteringSubordLastName,
  setFilteringPage,
  clearFilteringPage,
  clearFilter,
} = IPRsSlice.actions;
export default IPRsSlice.reducer;
