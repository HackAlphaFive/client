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
  xs = 12,
  s = 16,
  m = 20,
  l = 24,
  xl = 28,
}
