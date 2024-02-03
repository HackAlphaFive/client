import { StatusList, StatusListRU } from './types';

// Для генерации уникальной айди используем нашу функцию, а не прямой вызов uuidv4 или другого метода
export const getUniqId = () => Date.now() + Math.random();

export function getUniqArray_number(numbers: Iterable<number>) {
  return Array.from(new Set(numbers));
}


type TErrorHandler = (text: string, error?: unknown) => void;

export const handleError: TErrorHandler = (text, error = '') => {
  console.log(text, error);
};


export const translateStatus = (status: StatusList | StatusListRU, mode: 'ru-en' | 'en-ru') => {
  if (mode === 'en-ru') {
    let result;
    switch (status) {
      case StatusList.NoStatus:
        result = StatusListRU.NoStatus;
        break;
      case StatusList.Failed:
        result = StatusListRU.Failed;
        break;
      case StatusList.InProgress:
        result = StatusListRU.InProgress;
        break;
      case StatusList.Done:
        result = StatusListRU.Done;
        break;
      case StatusList.Canceled:
        result = StatusListRU.Canceled;
        break;
    }
    return result;
  } else {
    let result;
    switch (status) {
      case StatusListRU.NoStatus:
        result = StatusList.NoStatus;
        break;
      case StatusListRU.Failed:
        result = StatusList.Failed;
        break;
      case StatusListRU.InProgress:
        result = StatusList.InProgress;
        break;
      case StatusListRU.Done:
        result = StatusList.Done;
        break;
      case StatusListRU.Canceled:
        result = StatusList.Canceled;
        break;
    }
    return result;
  }
};

/**
 * Функция для форматирования даты
 * @param isoString дата в формате "2023-10-17"
 * @returns "17.10.2023"
 * @
 *  */
export const formatDate = (isoString: string) => {
  const [yyyy, mm, dd] = isoString.split('-');
  return `${dd}.${mm}.${yyyy}`;
};
