import { RootState } from "../types";

export const isTemplate = (state: RootState) => state.task.isTemplate
export const templateTask = (state: RootState) => state.task.templateElement
