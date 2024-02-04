import { StatusList } from "../types";

/* =============== auth & user =============== */

export type TEmployee = {
  fullname: string;
  position: string;
  photo: string;
  id: number;
};

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

/**
 * @description GET /users/get_subordinates/
 * @description need accessToken
 */
export type TResponseGetSubordinate = Omit<TUser, 'isSuperior'>[];

/**
 * @description GET /users/subordinates_without_ipr/
 * @description need accessToken
 */
export type TResponseSubordWithoutIPR = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Array<TEmployee>;
};



/* =============== IPRs =============== */

// Если написано "todo check" – проверка не была осуществлена (через реальный запрос на сервер и изучение ответа в devtools)

export type T_IPR_query = {
  page?: number;
  /**
   * id человека, ИПР которого ищутся
   */
  id?: number;
  status?: StatusList;
  start?: string;
  end?: string;
} | undefined;

export type T_IPR = {
  id: number;
  title: string;
  employee: TEmployee;
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
   * адрес эндпоинта, по которому сервер расположил следующую партию данных
   */
  next: null | string;
  previous: null | string;
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
 * @description need accessToken руководителя
 */
export type TBodyRequestChangeIPR = {
  title?: string;
  description?: string;
  /**
   * можно передать на бэк все статусы, но ограничим это хотя бы со стороны фронта
   */
  status?: Exclude<StatusList, StatusList.InProgress | StatusList.NoStatus>;
};

export type TResponseChangeIPR = T_IPR;

/**
 * DELETE /iprs/subordinates/{id}/
 * @description need accessToken
 * @description При успехе → 204 Statuse Code
 */
export type TResponseDeleteIPR = {};



/* =============== tasks =============== */


export type T_Task_query = {
  // page?: number;
  status?: StatusList;
  start?: string;
  end?: string;
} | undefined;
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
  status: StatusList;
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
   * Потому придётся делать второй запрос на основе ключа next первого запроса. И так далее
   */
  count: number;
  /**
   * адрес эндпоинта, по которому сервер расположил следующую партию данных
   */
  next: null | string;
  previous: null | string;
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
  ipr: number | string; // id передаётся ещё и в path. Зачем?
};

export type TResponseCreateTask = TTask;

/**
 * @description PATCH /iprs/{ipr_id}/tasks/{task_id}/
 * @description need accessToken (рукль или подчинённый)
 * @description все даты YYYY-MM-DD
 */
export type TBodyRequestChangeTaskSuperior = {
  title?: string;
  description?: string;
  status?: Exclude<StatusList, StatusList.InProgress  | StatusList.Done>;
  start_date?: string;
  end_date?: string;
};

export type TBodyRequestChangeTaskEmployee = {
  status: string;
};

export type TResponseChangeTask = {
  /**
   * id данной задачи
   */
  id: number;
  title: string;
  description: string;
  status: StatusList;
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
};

/**
 * @description GET /tasks/{id}/comments/
 * @description without accessToken
 */
export type TResponseGetComments = Array<TComment>;

/**
 * @description POST /tasks/{id}/comments/
 * @description need accessToken
 */
export type TBodyRequestCreateComment = { text: string };

export type TResponseCreateComment = TComment;
