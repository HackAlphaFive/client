import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { ReactElement, ReactNode } from "react";

type TTaskInitialState = {
  isTemplate: boolean;
  templateElement: {
    isTemplate: boolean;
    classNameLine: string;
    taskText: string;
    descriptionText: string;
    uniqueId: string | number;
  } | null;
};

const taskInitialState: TTaskInitialState = {
  isTemplate: false,
  templateElement: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: taskInitialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<boolean>) => {
      state.isTemplate = action.payload;
    },
    setTemplateElement: (state, action) => {
      state.templateElement = action.payload;
    },
  },
});

export const { setTemplate, setTemplateElement } = taskSlice.actions;
export default taskSlice.reducer;
