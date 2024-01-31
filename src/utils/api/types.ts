import { StatusList } from "../types";

export type TUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  patronymic: string | undefined;
  photo: string;
  email: string;
  position: string;
    /**
   * Массив из id непосредственных руководителей данного пользователя
   */
  superior: Array<number>;
  /**
   * Массив из id подчиненных
   */
  subordinates: Array<number>;
  isSuperior: boolean;
};
export type TResponseUsersMe = Omit<TUser, 'isSuperior'>;
export type TResponseGetSomeUser = Omit<TUser, 'isSuperior'>;

export type TResponseLogin = {
  token: string;
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
