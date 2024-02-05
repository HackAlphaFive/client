import { RootState } from "../types";

export const getCommentsError = (state: RootState) => state.comments.error

export const getCommentsContainer = (state: RootState) => state.comments.commentsToTask
export const getCommentsPending = (state: RootState) => state.comments.commentsToTaskPending
export const getCommentsSuccess = (state: RootState) => state.comments.commentsToTaskSuccess

export const getSendComment = (state: RootState) => state.comments.sendComment
export const getSendCommentPending = (state: RootState) => state.comments.sendCommentPending
export const getSendCommentSuccess = (state: RootState) => state.comments.sendCommentSuccess
