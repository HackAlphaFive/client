import { createSelector } from '@reduxjs/toolkit';
import { TResponseGetSomeUser, T_IPR, T_IPR_query } from '../../utils/api/types';
import { getUniqArray_number, handleError } from '../../utils/utils';
import { getAnotherUser } from '../middlewares/authQueries';
import { RootState } from '../types';

export const getIPRsError = (state: RootState) => state.iprs.error;

export const getmyIPRsPending = (state: RootState) => state.iprs.myIPRsPending;
export const getmyIPRsSuccess = (state: RootState) => state.iprs.myIPRsSuccess;
export const getmyIPRsFromStore = (state: RootState) => state.iprs.myIPRs;

export const getSubordIPRsPending = (state: RootState) => state.iprs.subordIPRsPending;
export const getSubordIPRsSuccess = (state: RootState) => state.iprs.subordIPRsSuccess;
export const getSubordIPRsFromStore = (state: RootState) => state.iprs.subordIPRs.results;

export const getFilteringIPRStatus = (state: RootState) => state.iprs.filteringIPRStatus;
export const getFilteringDateStart = (state: RootState) => state.iprs.filteringDateStart;
export const getFilteringDateEnd = (state: RootState) => state.iprs.filteringDateEnd;
export const getFilteringPage = (state: RootState) => state.iprs.filteringPage;
export const getFilteringSubordId = (state: RootState) => state.iprs.filteringSubordId;

export const getIPRQuery = createSelector(
  [getFilteringIPRStatus, getFilteringDateStart, getFilteringDateEnd, getFilteringPage, getFilteringSubordId],
  (status, start, end, page, id) => {
    const result: T_IPR_query = {};

    if (status) result.status = status;
    if (start) result.start = start;
    if (end) result.end = end;
    if (page) result.page = page;
    if (status) result.status = status;
    if (id) result.id = id;

    return result;
  }
);
