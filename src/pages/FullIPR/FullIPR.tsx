import React, { FC, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Link } from '@alfalab/core-components/link';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Gap } from '@alfalab/core-components/gap';

import {ReactComponent as ArrowIcon} from '../../assets/sidebar-icons/Arrow.svg';
import TitleInput from '../../components/TitleInput/TitleInput';
import StatusDropdown from '../../components/StatusDropdown/StatusDropdown';
import TableTask from '../../components/TableTask/TableTask';
import TabFiltrText from '../../components/TabFiltrText/TabFiltrText';
import { StatusList, StatusListRU } from '../../utils/types';

import styles from './FullIPR.module.css';

const defaultStatus = { label: StatusListRU.NoStatus, value: StatusList.NoStatus };

type FormData = {
  title: string;
  status: string;
};

const FullIPR: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<'empty' | 'existing'>('empty');
  const [wasChanged, setWasChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [initialData, setInitialData] = useState<FormData>({ title: '', status: defaultStatus.value });
  const [formData, setFormData] = useState<FormData>({ title: '', status: defaultStatus.value });

  const loadedTitle = useSelector(() => '');
  const loadedStatus = useSelector(() => '');

  useEffect(() => {
    if (location.pathname.indexOf('ipr/edit') !== -1) {
      setMode('empty');
    } else {
      setMode('existing');
    }
  }, [location]);

  useEffect(() => {
    setInitialData({ title: loadedTitle, status: loadedStatus });
    setFormData({ title: loadedTitle, status: loadedStatus });
  }, []);

  // Функция для обновления formData при изменении
  const handleDataChange = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setWasChanged(true);
  };

  // Проверка на изменения данных для активации кнопки "Сохранить"
  useEffect(() => {
    setIsValid(JSON.stringify(formData) !== JSON.stringify(initialData));
  }, [formData, initialData]);

  // Обработчик для кнопки "Отмена"
  const handleCancel = () => {
    navigate('/ipr');
  };

  // Обработчик для кнопки "Сохранить ИПР"
  const handleSave = () => {
    console.log('Сохраняем данные ИПР:', formData);
    // Здесь должен быть код для сохранения данных
    navigate('/ipr'); // Или перенаправление куда-либо после сохранения
  };

  const photo = useSelector(() => '');
  const fullname = useSelector(() => '');
  const position = useSelector(() => '');
  const title = useSelector(() => '');
  const status = useSelector(() => '');

  return (
    <div>
      <Link
        className={styles.iprLinkBack}
        view='primary'
        Component={RouterLink}
        href='/ipr'
        underline={false}
        leftAddons={<ArrowIcon />}
      >
        Назад
      </Link>

      <h1 className='text text_type_heading1'>ИПР Сотрудника</h1>

      <div className={styles.iprContainer}>
        <form className={styles.form}>
          {mode === 'existing' ? (
            <textarea
              className={styles.inputEmployeeInfo}
              disabled
              value={`${fullname}\n${position}`}
            />
          ) : (
            <>
              <TabFiltrText needMagnifier={false} myLabel='ФИО' myWidth='initial' />
              <Gap size='2xs'/>
              <p className='text text_type_small text_color_tooltip'>Введите ФИО сотрудника</p>
            </>
          )}

          <Gap size='xl'/>
          <TitleInput title={title} onTitleChange={(title) => handleDataChange({ title })} />

          <Gap size='xl'/>
          <StatusDropdown
            currentStatus={formData.status}
            onStatusChange={(status) => handleDataChange({ status })}/>
        </form>
          <img src={photo} alt="Аватарка сотрудника" className={styles.avatar}/>
      </div>

      <Gap size='4xl'/>
      <TableTask />

      <Gap size='4xl' />

      <div className={styles.buttonsWrapper}>
        <ButtonDesktop
          onClick={handleCancel}
          view='secondary'
          block={true}
        >
          Отмена
        </ButtonDesktop>
        <ButtonDesktop
          onClick={handleSave}
          view='accent'
          block={true}
          disabled={!wasChanged || !isValid}
        >
          Сохранить ИПР
        </ButtonDesktop>
      </div>
    </div>
  )
}

export default FullIPR;
