export enum StatusList {
  NoStatus = 'No status',
  Failed = 'Failed',
  InProgress = 'In Progress',
  Done = 'Done',
  Canceled = 'Canceled',
}

export enum StatusListRU {
  NoStatus = 'Отсутствует',
  Failed = 'Не выполнено',
  InProgress = 'В работе',
  Done = 'Выполнено',
  Canceled = 'Отменено',
}

export type StatusListTask = Exclude<StatusList, StatusList.NoStatus>;

export enum DimensionsListIcons {
  xs = '12px',
  s = '16px',
  m = '20px',
  l = '24px',
  xl = '28px',
}
