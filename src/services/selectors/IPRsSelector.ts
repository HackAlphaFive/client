import { RootState } from '../types';

export const getIPRsError = (state: RootState) => state.iprs.error;

export const getmyIPRsPending = (state: RootState) => state.iprs.myIPRsPending;
export const getmyIPRsSuccess = (state: RootState) => state.iprs.myIPRsSuccess;
export const getmyIPRsFromStore = (state: RootState) => state.iprs.myIPRs;

export const getSubordIPRsPending = (state: RootState) => state.iprs.subordIPRsPending;
export const getSubordIPRsSuccess = (state: RootState) => state.iprs.subordIPRsSuccess;
export const getSubordIPRsFromStore = (state: RootState) => state.iprs.subordIPRs;
