import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { T_Task_query } from "../../utils/api/types";

export const isTemplate = (state: RootState) => state.task.isTemplate;
export const templateTask = (state: RootState) => state.task.templateElement;

export const getTaskError = (state:RootState) => state.task.error

export const getTasksToIPR = (state: RootState) => state.task.tasksToIPR;
export const getTasksToIPRPending = (state: RootState) =>
  state.task.tasksToIPRPending;
export const getTasksToIPRSuccess = (state: RootState) =>
  state.task.tasksToIPRSuccess;

export const getCreatedTask = (state: RootState) => state.task.createdTask;
export const getCreatedTaskPending = (state: RootState) =>
  state.task.createdTaskPending;
export const getCreatedTaskSuccess = (state: RootState) =>
  state.task.createdTaskSuccess;

export const getChangeTask = (state: RootState) => state.task.changeTask;
export const getChangeTaskPending = (state: RootState) =>
  state.task.changeTaskPending;
export const getChangeTaskSuccess = (state: RootState) =>
  state.task.changeTaskSuccess;

export const getDeleteTaskPending = (state: RootState) => state.task.deleteTaskPending
export const getDeleteTaskSuccess = (state: RootState) => state.task.deleteTaskSuccess


export const getFilteringTaskStatus = (state: RootState) =>
  state.task.filteringTaskStatus;
export const getFilteringTaskDateEnd = (state: RootState) =>
  state.task.filteringTaskDateEnd;
export const getFilteringTaskDateStart = (state: RootState) =>
  state.task.filteringTaskDateStart;

export const getTasksQuery = createSelector(
  [getFilteringTaskStatus, getFilteringTaskDateEnd, getFilteringTaskDateStart],
  (status, start, end) => {
    const result: T_Task_query = {}

    if (status) result.status = status;
    if (start) result.start = start;
    if (end) result.end = end;

    return result;
  }
);
