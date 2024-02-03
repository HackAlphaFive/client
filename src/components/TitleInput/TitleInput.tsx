import React, { FC, useState } from 'react';

import { ReactComponent as PenIcon } from '../../assets/input-icons/lucide_pen.svg';
import { ReactComponent as ClearIcon } from '../../assets/input-icons/clear.svg';
import styles from './TitleInput.module.css';

type TProps = {
  title?: string;
}

const TitleInput: FC<TProps> = ({title}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClearClick = () => {
    setInputValue('');
    setError('Поле обязательно для заполнения');
  };

  const validateInput = (value: string) => {
    if (value.trim() === '') {
      return 'Поле обязательно для заполнения';
    }
    if (value.length < 3 || value.length > 100) {
      return 'Длина названия должна быть от 3 до 100 символов';
    }
    if (!/^[а-яА-ЯёЁa-zA-Z0-9]+( [а-яА-ЯёЁa-zA-Z0-9]+)*$/.test(value)) {
      return 'Название должно содержать только буквы и цифры, без двойных пробелов';
    }
    return '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    if (isEditing) {
      setError(validateInput(value));
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={`${styles.input} ${error ? styles.inputError : (isEditing && !error && (inputValue ?? '').trim() !== '') ? styles.inputSuccess : ''}`}
        placeholder="Введите название ИПР"
        value={inputValue ?? ''}
        onChange={handleChange}
        readOnly={!isEditing}
      />
      {error && <div className={styles.error}>{error}</div>}
      {inputValue && isEditing && (
        <ClearIcon className={styles.clearIcon} onClick={handleClearClick}/>
      )}
      {!isEditing && (
        <PenIcon className={styles.penIcon} onClick={handleEditClick}/>
      )}
    </div>
  );
}

export default TitleInput;
