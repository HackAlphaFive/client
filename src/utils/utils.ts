import { v4 as uuidv4 } from 'uuid';
import { StatusList, StatusListRU } from './types';

// Для генерации уникальной айди используем нашу функцию, а не прямой вызов uuidv4
export const getUniqId = () => uuidv4();


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
