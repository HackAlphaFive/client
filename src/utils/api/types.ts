import { StatusList } from "../types";

/* =============== auth & user =============== */

export type TUser = {
  id: number;
  /**
   * логин пользователя
   */
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

/**
 * сервер присылает токен без слова "Bearer", а отправлять надо с этим словом (ну и пробелом)
 */
export type TResponseLogin = {
  token: string;
};



/* =============== IPRs =============== */

// Если написано "todo check" – проверка не была осуществлена (через реальный запрос на сервер и изучение ответа в devtools)

export type T_IPR = {
  id: number;
  title: string;
  /**
   * Имя Фамилия
   */
  employee: string;
  /**
   * Имя Фамилия ← создателя ИПР
   */
  author: string;
  description: string;
  status: StatusList;
  created_date: string;
  start_date: string | null;
  end_date: string | null;
};

export type TResponseIPRsMy = {
  /**
   * число страниц, на которых помещаются ИПР, попадающие под критерии фильтрации. По 5 штук на страницу
   */
  count: number;
  /**
   * номер следующей страницы, относительно переданной в данном ответе
   */
  next: null | number;
  /**
   * номер предыдущей страницы, относительно переданной в данном ответе
   */
  previous: null | number;
  /**
   * массив объектов ИПР. Может быть пустой!
   */
  results: Array<T_IPR>;
}

export type TResponseIPRsForSubord = TResponseIPRsMy;

/**
 * POST /iprs/subordinates/
 * @description need accessToken
 */
export type TBodyRequestCreateIPR = {
  /**
   * название ИПР
   */
  title: string;
  /**
   * id человека, которому назначется ИПР
   */
  employee: number;
  /**
   * описание ИПР. Должно быть заполнено не пустой строкой
   * @description не используется
   */
  description: string;
};

export type TResponseCreateIPR = T_IPR;

/**
 * @description GET /iprs/subordinates/{id}/
 * @description need accessToken
 */
export type TResponseGetIPRById = T_IPR;

/**
 * PATCH /iprs/subordinates/{id}/
 * @description need accessToken
 */
export type TBodyRequestChangeIPR = {
  title?: string;
  description?: string;
  status?: Exclude<StatusList, StatusList.InProgress>;
};

export type TResponseChangeIPR = T_IPR;

/**
 * DELETE /iprs/subordinates/{id}/
 * @description need accessToken
 * @description При успехе → 204 Statuse Code
 */
export type TResponseDeleteIPR = {};



/* =============== tasks =============== */

/**
 * все даты в YYYY-MM-DD
 */
export type TTask = {
  /**
   * id данной задачи
   */
  id: number;
  title: string;
  description: string;
  status: unknown; // todo статусы неодинаковые с ИПР
  /**
   * username автора (его логин)
   */
  author: string;
  /**
   * id ИПР, к которому принадлежит задача
   */
  ipr: number;
  created_date: string;
  start_date: string;
  end_date: string;
};

/**
 * @description GET /iprs/{id}/tasks/
 * @description need accessToken
 * @description получение задач к конкретной ИПР
 */
export type TResponseGetTasks = {
  /**
   * число страниц, на которых помещаются задачи, попадающие под критерии фильтрации.
   * По 5 штук на страницу. Хотя на фронте задачи не пагинириуются, а скролятся.
   * Потому НЕ передаём page в query
   */
  count: number;
  /**
   * номер следующей страницы, относительно переданной в данном ответе
   */
  next: null | number;
  /**
   * номер предыдущей страницы, относительно переданной в данном ответе
   */
  previous: null | number;
  /**
   * массив объектов задач. Может быть пустой
   */
  results: Array<Omit<TTask, 'ipr'> & {
    /**
     * название ИПР
     */
    ipr: string // да, почему-то тут даётся название, а где-то айдишка
  }>;
};

/**
 * @description POST /iprs/{ipr_id}/tasks/
 * @description need accessToken
 * @description все ключи обязательны
 */
export type TBodyRequestCreateTask = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  /**
   * id ИПР, к которому относится создаваемая задача
   */
  ipr: number; // id передаётся ещё и в path. Зачем?
};

export type TResponseCreateTask = TTask;

export type TBodyRequestChangeTask = {
  title?: string;
  description?: string;
  status?: unknown; // todo
  start_date?: string;
  end_date?: string;
};

/**
 * @description PATCH /iprs/{ipr_id}/tasks/{task_id}/
 * @description need accessToken
 * @description все даты YYYY-MM-DD
 * @description
 */
export type TResponseChangeTask = {
  /**
   * id данной задачи
   */
  id: number;
  title: string;
  description: string;
  status: unknown; // todo
  /**
   * username (логин)
   */
  author: string;
  start_date: string;
  end_date: string;
  created_date: string;
};

/* =============== comments =============== */

export type TComment = {
  /**
   * id данного коммента
   */
  id: number;
  /**
   * date-time
   */
  created_date: string;
  /**
   * username (логин)
   */
  author: string;
  /**
   * id задачи, к которой принадлежит комментарий
   */
  task: number;
  text: string;
  /**
   * id комментария, на который отвечает данный комментарий. Функционал тредов
   */
  reply: null | number; // todo правильно понял?
};

/**
 * @description GET /tasks/{id}/comments/
 * @description without accessToken
 */
export type TResponseGetComments = {
  /**
   * число комментариев. Видимо возможна фильтрация?
   */
  count: number;
  /**
   * пагинация
   */
  next: null | number;
  previous: null | number;
  results: Array<TComment>;
};

/**
 * @description POST /tasks/{id}/comments/
 * @description need accessToken
 */
export type TBodyRequestCreateComment = { text: string };

export type TResponseCreateComment = TComment;
