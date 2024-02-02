import React, { FC, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from '@alfalab/core-components/link';
import {ReactComponent as ArrowIcon} from '../../assets/sidebar-icons/Arrow.svg';
import TitleInput from '../../components/TitleInput/TitleInput';

import styles from './FullIPR.module.css';
import StatusDropdown from '../../components/StatusInput/StatusDropdown';
import { useSelector } from '../../services/hooks';
import TableTask from '../../components/TableTask/TableTask';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Gap } from '@alfalab/core-components/gap';
import TabFiltrText from '../../components/TabFiltrText/TabFiltrText';

const FullIPR: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<'empty' | 'existing'>('empty');
  const [wasChanged, setWasChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (location.pathname.indexOf('ipr/edit') !== -1) {
      setMode('empty');
    } else {
      setMode('existing');
    }
  }, [location]);

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
          <TitleInput title={title} />

          <Gap size='xl'/>
          <StatusDropdown />
        </form>
          <img src={photo} alt="Аватарка сотрудника" className={styles.avatar}/>
      </div>

      <Gap size='4xl'/>
      <TableTask />

      <Gap size='4xl' />

      <div className={styles.buttonsWrapper}>
        <ButtonDesktop
          view='secondary'
          block={true}
          disabled={!wasChanged}
        >
          Отмена
        </ButtonDesktop>
        <ButtonDesktop
          view='accent'
          block={true}
          disabled={!isValid}
        >
          Сохранить ИПР
        </ButtonDesktop>
      </div>
    </div>
  )
}

export default FullIPR;
