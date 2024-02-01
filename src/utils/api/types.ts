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

// todo check - проверка не была осуществлена (через реальный запрос на сервер и изучение ответа в devtools)
export type TEmployee = {
  /**
   * ФИО целиком
   */
  fullName: string;
  position: string;
};

// todo check
export type T_IPR = {
  id: number;
  title: string;
  employee: TEmployee;
  /**
   * ФИО создателя ИПР
   */
  author: string;
  description: string;
  status: StatusList;
  created_date: string;
  start_date: string;
  end_date: string;
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
   * номер предыдущей страницы, относительно.......
   */
  previous: null | number;
  /**
   * массив объектов ИПР. Может быть пустой!
   */
  results: Array<T_IPR>;
}

export type TResponseIPRsForSubord = TResponseIPRsMy;

// todo check
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
   * описание ИПР. Не используется у нас?
   */
  description: string;
};

// todo check
export type TResponseCreateIPR = T_IPR;

// todo check
export type TResponseGetIPRById = T_IPR;

// todo check
export type TBodyRequestChangeIPR = {
  title?: string;
  description?: string;
  status?: StatusList;
  start_date?: string; // нельзя это менять в ипр со стороны клиента
  end_date?: string; // нельзя это менять в ипр со стороны клиента
};

// todo check
export type TResponseChangeIPR = T_IPR;

// todo check
export type TResponseDeleteIPR = {
  success: boolean;
};



/* =============== tasks =============== */

// todo check
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

// todo check
/**
 * @description GET /iprs/{id}/tasks/
 */
export type TResponseGetTasks = Array<Omit<TTask, 'comments'>>;

// todo check
/**
 * @description POST /tasks/
 */
export type TBodyRequestCreateTask = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  /**
   * id ИПР, к которому относится создаваемая задача
   */
  ipr: number;
};

// todo check
export type TResponseCreateTask = TTask; // Зачем тут в ответе полная задача, с комментами ещё..?

// todo check
export type TBodyRequestChangeTask = {
  title?: string;
  description?: string;
  status?: StatusList;
  start_date?: string;
  end_date?: string;
};

// todo check
export type TResponseChangeTask = {
  title: string;
  description: string;
  status: StatusList;
  start_date: string;
  end_date: string;
};

/* =============== comment =============== */

// todo check
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

// todo check
export type TResponseGetComments = Array<TComment>;

// todo check
export type TBodyRequestCreateComment = Omit<TComment, 'id' | 'created_date'>;
// todo check
export type TResponseCreateComment = TComment;
