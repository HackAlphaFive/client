import { RootState } from "../types";

export const getCurrentIPRFromStore = (state: RootState) => state.ipr.currentIPR;
export const getSingleIPRPending = (state: RootState) => state.ipr.singleIPRPending;
export const getSingleIPRSuccess = (state: RootState) => state.ipr.singleIPRSuccess;
export const getIntermediateStatus = (state: RootState) => state.ipr.intermediateStatus;
export const getIdForCreate = (state: RootState) => state.ipr.idForCreate;
export const getPhoto = (state: RootState) => state.ipr.photo;
