import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { ReactElement, ReactNode } from "react";
import {
  deleteTask,
  getTaskByIdIPR,
  patchTaskByEmployee,
  patchTaskBySuperior,
  postTask,
} from "../middlewares/taskQueries";
import { StatusList } from "../../utils/types";
import {
  TResponseChangeTask,
  TResponseCreateTask,
  TResponseGetTasks,
  TTask,
} from "../../utils/api/types";

type TTaskInitialState = {
  isTemplate: boolean;
  templateElement: {
    isTemplate: boolean;
    classNameLine: string;
    status: StatusList.NoStatus;
    taskText: string;
    descriptionText: string;
    uniqueId: number;
  } | null;
  filteringTaskStatus: StatusList | null;
  filteringTaskDateStart: string | null;
  filteringTaskDateEnd: string | null;
  error: string;
  tasksToIPRPending: boolean;
  tasksToIPRSuccess: null | boolean;
  tasksToIPR: Array<TTask>;
  createdTaskPending: boolean;
  createdTaskSuccess: null | boolean;
  createdTask: TResponseCreateTask | null;
  changeTaskPending: boolean;
  changeTaskSuccess: null | boolean;
  changeTask: TResponseChangeTask | null;
  deleteTaskPending: boolean;
  deleteTaskSuccess: null | boolean;
};

const emptyTasksToIpr: [] = [];

const taskInitialState: TTaskInitialState = {
  isTemplate: false,
  templateElement: null,
  filteringTaskStatus: null,
  filteringTaskDateStart: null,
  filteringTaskDateEnd: null,
  error: "",
  tasksToIPRPending: false,
  tasksToIPRSuccess: null,
  tasksToIPR: emptyTasksToIpr,
  createdTaskPending: false,
  createdTaskSuccess: null,
  createdTask: null,
  changeTaskPending: false,
  changeTaskSuccess: null,
  changeTask: null,
  deleteTaskPending: false,
  deleteTaskSuccess: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: taskInitialState,
  reducers: {
    setFilteringTaskStatus: (state, action: PayloadAction<StatusList>) => {
      state.filteringTaskStatus = action.payload;
    },
    clearFilteringTaskStatus: (state) => {
      state.filteringTaskStatus = taskInitialState.filteringTaskStatus;
    },

    setFilteringTaskDateStart: (state, action: PayloadAction<string>) => {
      state.filteringTaskDateStart = action.payload;
    },
    clearFilteringTaskDateStart: (state) => {
      state.filteringTaskDateStart = taskInitialState.filteringTaskDateStart;
    },

    setFilteringTaskDateEnd: (state, action: PayloadAction<string>) => {
      state.filteringTaskDateEnd = action.payload;
    },
    clearFilteringTaskDateEnd: (state) => {
      state.filteringTaskDateEnd = taskInitialState.filteringTaskDateEnd;
    },
    clearTaskFilter: (state) => {
      state.filteringTaskStatus = taskInitialState.filteringTaskStatus;
      state.filteringTaskDateStart = taskInitialState.filteringTaskDateStart;
      state.filteringTaskDateEnd = taskInitialState.filteringTaskDateEnd;
    },
    setTemplate: (state, action: PayloadAction<boolean>) => {
      state.isTemplate = action.payload;
    },
    setTemplateElement: (state, action) => {
      state.templateElement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskByIdIPR.pending.type, (state, action) => {
      state.tasksToIPRSuccess = null;
      state.tasksToIPRPending = true;
      state.error = "";
    });
    builder.addCase(
      getTaskByIdIPR.fulfilled.type,
      (state, action: PayloadAction<Array<TTask>>) => {
        state.tasksToIPRSuccess = true;
        state.tasksToIPRPending = false;
        state.tasksToIPR = action.payload;
      }
    );
    builder.addCase(
      getTaskByIdIPR.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.tasksToIPRSuccess = false;
        state.tasksToIPRPending = false;
        state.error = action.payload;
      }
    );
    builder.addCase(postTask.pending.type, (state, action) => {
      state.createdTaskSuccess = null;
      state.createdTaskPending = true;
      state.error = "";
    });
    builder.addCase(
      postTask.fulfilled.type,
      (state, action: PayloadAction<TResponseCreateTask>) => {
        state.createdTaskSuccess = true;
        state.createdTaskPending = false;
        state.createdTask = action.payload;
      }
    );
    builder.addCase(
      postTask.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.createdTaskSuccess = false;
        state.createdTaskPending = false;
        state.error = action.payload;
      }
    );
    builder.addCase(patchTaskBySuperior.pending.type, (state, action) => {
      state.changeTaskSuccess = null;
      state.changeTaskPending = true;
      state.error = "";
    });
    builder.addCase(
      patchTaskBySuperior.fulfilled.type,
      (state, action: PayloadAction<TResponseChangeTask>) => {
        state.changeTaskSuccess = true;
        state.changeTaskPending = false;
        state.changeTask = action.payload;
      }
    );
    builder.addCase(
      patchTaskBySuperior.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.changeTaskSuccess = false;
        state.changeTaskPending = false;
        state.error = action.payload;
      }
    );
    builder.addCase(patchTaskByEmployee.pending.type, (state, action) => {
      state.changeTaskSuccess = null;
      state.changeTaskPending = true;
      state.error = "";
    });
    builder.addCase(
      patchTaskByEmployee.fulfilled.type,
      (state, action: PayloadAction<TResponseChangeTask>) => {
        state.changeTaskSuccess = true;
        state.changeTaskPending = false;
        state.changeTask = action.payload;
      }
    );
    builder.addCase(
      patchTaskByEmployee.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.changeTaskSuccess = false;
        state.changeTaskPending = false;
        state.error = action.payload;
      }
    );
    builder.addCase(deleteTask.pending.type, (state, action) => {
      state.deleteTaskSuccess = null;
      state.deleteTaskPending = true;
      state.error = "";
    });
    builder.addCase(
      deleteTask.fulfilled.type,
      (state, action) => {
        state.deleteTaskSuccess = true;
        state.deleteTaskPending = false;
      }
    );
    builder.addCase(
      deleteTask.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.deleteTaskSuccess = false;
        state.deleteTaskPending = false;
        state.error = action.payload;
      }
    );
  },
});

export const {
  setTemplate,
  setTemplateElement,
  setFilteringTaskStatus,
  clearFilteringTaskStatus,
  setFilteringTaskDateStart,
  clearFilteringTaskDateStart,
  setFilteringTaskDateEnd,
  clearFilteringTaskDateEnd,
} = taskSlice.actions;
export default taskSlice.reducer;
