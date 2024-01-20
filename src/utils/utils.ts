import { v4 as uuidv4 } from 'uuid';

// Для генерации уникальной айди используем нашу функцию, а не прямой вызов uuidv4
export const getUniqId = () => uuidv4();



type TErrorHandler = (text: string, error?: unknown) => void;

export const handleError: TErrorHandler = (text, error = '') => {
  console.log(text, error);
};
