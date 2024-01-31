import { StatusList } from "../types";

export type TToken = {
  accessToken: string;
  type: 'Bearer';
};

export type TComment = {
  id: number;
  created_date: string;
  /**
   * id автора комментария
   */
  author: number;
  /**
   * id задачи, к которой принадлежит комментарий
   */
  task: number;
  text: string;
};

export type TTask = {
  id: number;
  title: string;
  description: string;
  status: StatusList;
  /**
   * Название ИПР, к которому принадлежит задача
   */
  ipr: string;
  comments: Array<TComment>;
  created_date: string;
  start_date: string;
  end_date: string;
};
