import { FC, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getIPRById, updateIPRById } from '../../services/middlewares/singleIPRQueries';

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
import { getCurrentIPRFromStore, getSingleIPRPending, getSingleIPRSuccess } from '../../services/selectors/singleIPRSelector';
import { translateStatus } from '../../utils/utils';
import { NAME_FOR_404 } from '../../utils/constants';
import { getUserRole } from '../../services/selectors/authSelector';
import { Spinner } from '@alfalab/core-components/spinner';
import TabFiltrStatus from '../../components/TabFiltrStatus/TabFiltrStatus';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { Radio } from '@alfalab/core-components/radio';
import TabForStatus from './TabForStatus';


type TFormData = {
  title: string;
  status: StatusListRU;
};

const FullIPR: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const idFromURL = params.id;

  const isSuperior = useSelector(getUserRole);
  const currentIPR = useSelector(getCurrentIPRFromStore);
  const IPRPending = useSelector(getSingleIPRPending);
  const IPRSucces = useSelector(getSingleIPRSuccess);

  const [mode, setMode] = useState<'empty' | 'existing'>('empty');

  const [wasChanged, setWasChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const defaultStatus = StatusListRU.NoStatus;
  const [initialData, setInitialData] = useState<TFormData>({ title: '', status: defaultStatus });
  const [formData, setFormData] = useState<TFormData>({ title: '', status: defaultStatus });

  const options = [
    { key: '1', content: <div className={`${styles.item} text_color_main text_type_middle`}>{StatusListRU.Failed}</div> },
    { key: '2', content: <div className={`${styles.done} ${styles.item} text_type_middle`}>{StatusListRU.Done}</div> },
    { key: '3', content: <div className={`${styles.canceled} ${styles.item} text_type_middle`}>{StatusListRU.Canceled}</div> },
  ];



  useEffect(() => {
    if (idFromURL && isSuperior !== undefined) {
      dispatch(getIPRById({id: idFromURL, isSuperior}));
    }
  }, [idFromURL, isSuperior]);

  useEffect(() => {
    if (location.pathname.indexOf('ipr/create') !== -1) {
      setMode('empty');
    } else {
      setMode('existing');
    }
  }, [location]);

  useEffect(() => {
    if (currentIPR) {
      setInitialData({ title: currentIPR.title, status: translateStatus(currentIPR.status, 'en-ru') as StatusListRU });
      setFormData({ title: currentIPR.title, status: translateStatus(currentIPR.status, 'en-ru') as StatusListRU });
    }
  }, [currentIPR]);

  // Функция для обновления formData при изменении
  const handleDataChange = (newData: Partial<TFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setWasChanged(true);
  };

  // Проверка на изменения данных для активации кнопки "Сохранить"
  useEffect(() => {
    setIsValid(JSON.stringify(formData) !== JSON.stringify(initialData));
  }, [formData, initialData]);

  // Обработчик для кнопки "Отмена"
  const handleCancel = () => {
    if (mode === 'empty') navigate('/ipr');
    if (mode === 'existing') {
      setFormData({
        title: currentIPR?.title || 'Ошибка при возврате данных',
        status: translateStatus(currentIPR!.status, 'en-ru') as StatusListRU,
      });
      setWasChanged(false);
    };
  };

  // Обработчик для кнопки "Сохранить ИПР"
  const handleSave = () => {
    if (idFromURL) {
      const preparedData = {
        id: idFromURL,
        body: {
          title: formData.title,
          status: translateStatus(formData.status, 'ru-en') as Exclude<StatusList, StatusList.InProgress | StatusList.InProgress | StatusList.NoStatus>,
        }
      }
      dispatch(updateIPRById(preparedData));
    } else {
      alert('Попытка сохранить ИПР с неизвестным id. Может, Вы стёрли его из адресной строки?');
    }
  };

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
        {IPRPending ? (<Spinner size='m' visible={true}/>) : (
          <>
            <form className={styles.form}>
              {mode === 'existing' ? (
                <textarea
                  className={styles.inputEmployeeInfo}
                  disabled
                  value={`${currentIPR!.employee.fullname}\n${currentIPR!.employee.position}`}
                />
              ) : (
                <>
                  <TabFiltrText needMagnifier={false} myLabel='ФИО' myWidth='initial' />
                  <Gap size='2xs'/>
                  <p className='text text_type_small text_color_tooltip'>Введите ФИО сотрудника</p>
                </>
              )}

              <Gap size='xl'/>
              <TitleInput title={currentIPR ? currentIPR.title : undefined} onTitleChange={(title) => handleDataChange({ title })} />

              <Gap size='xl'/>

              <TabForStatus
                mode={mode}
              />
            </form>

            {mode === 'existing' ? (
            <img src={currentIPR?.employee.photo} alt="Аватарка сотрудника" className={styles.avatar}/>
            ) : (
            <div className={styles.avatarStub}>Фото</div>
            )}
          </>
        )}
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
