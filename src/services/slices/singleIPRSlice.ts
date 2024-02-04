import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { T_IPR } from '../../utils/api/types';
import { createIPR, getIPRById, updateIPRById } from '../middlewares/singleIPRQueries';
import { StatusList } from '../../utils/types';

type TSingleIPRInitialState = {
  currentIPR: null | T_IPR;
  singleIPRPending: boolean;
  singleIPRSuccess: null | boolean;
  error: unknown;
  intermediateStatus: null | StatusList;
  idForCreate: null | number;
  photo: string;
};

const initialState: TSingleIPRInitialState = {
  currentIPR: null,
  singleIPRPending: false,
  singleIPRSuccess: null,
  error: '',
  intermediateStatus: null,
  idForCreate: null,
  photo: '',
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
    setIntermideateStatus: (state, action: PayloadAction<null | StatusList>) => {
      state.intermediateStatus = action.payload;
    },
    setIdForCreate: (state, action: PayloadAction<number>) => {
      state.idForCreate = action.payload;
    },
    setPhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
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

    builder.addCase(createIPR.pending, (state) => {
      state.error = '';
      state.singleIPRPending = true;
      state.singleIPRSuccess = null;
    })
    builder.addCase(createIPR.fulfilled, (state, action) => {
      state.singleIPRPending = false;
      state.singleIPRSuccess = true;
      state.currentIPR = action.payload;
    })
    builder.addCase(createIPR.rejected, (state, action) => {
      state.error = action;
      state.singleIPRPending = false;
      state.singleIPRSuccess = false;
    })
  }
});


export const {
  clearCurrentIPR,
  setIntermideateStatus,
  setIdForCreate,
  setPhoto,
} = singleIPRSlice.actions;
export default singleIPRSlice.reducer;
