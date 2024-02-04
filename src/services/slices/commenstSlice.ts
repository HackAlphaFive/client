import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TResponseCreateComment,
  TResponseGetComments,
} from "../../utils/api/types";
import { getComments, postComment } from "../middlewares/commentsQueries";

type TCommentsInitialState = {
  commentsToTask: TResponseGetComments | null;
  commentsToTaskPending: boolean;
  commentsToTaskSuccess: boolean | null;
  sendComment: TResponseCreateComment | null;
  sendCommentPending: boolean;
  sendCommentSuccess: null | boolean;
  error: string;
};

const emptyComment = {
  id: 0,
  created_date: '',
  author: "",
  task: 0,
  text: "",
};
const emptyCommentsContainer = [emptyComment];

const commentsInitialState: TCommentsInitialState = {
  commentsToTask: [],
  commentsToTaskPending: false,
  commentsToTaskSuccess: null,
  sendComment: emptyComment,
  sendCommentPending: false,
  sendCommentSuccess: null,
  error: "",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending.type, (state, action) => {
      state.commentsToTaskPending = true;
      state.commentsToTaskSuccess = false;
      state.error = "";
    });
    builder.addCase(
      getComments.fulfilled.type,
      (state, action: PayloadAction<TResponseGetComments>) => {
        state.commentsToTaskPending = false;
        state.commentsToTaskSuccess = true;
        state.commentsToTask = action.payload;
      }
    );
    builder.addCase(
      getComments.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.commentsToTaskPending = false;
        state.commentsToTaskSuccess = false;
        state.error = action.payload;
      }
    );
    builder.addCase(postComment.pending.type, (state, action) => {
      state.sendCommentPending = true;
      state.sendCommentSuccess = false;
      state.error = "";
    });
    builder.addCase(
      postComment.fulfilled.type,
      (state, action: PayloadAction<TResponseCreateComment>) => {
        state.sendCommentPending = false;
        state.sendCommentSuccess = true;
        state.sendComment = action.payload;
      }
    );
    builder.addCase(
      postComment.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.sendCommentPending = false;
        state.sendCommentSuccess = false;
        state.error = action.payload;
      }
    );
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
