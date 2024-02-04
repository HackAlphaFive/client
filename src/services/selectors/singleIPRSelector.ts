import { RootState } from "../types";

export const getCurrentIPRFromStore = (state: RootState) => state.ipr.currentIPR;
export const getSingleIPRPending = (state: RootState) => state.ipr.singleIPRPending;
export const getSingleIPRSuccess = (state: RootState) => state.ipr.singleIPRSuccess;
