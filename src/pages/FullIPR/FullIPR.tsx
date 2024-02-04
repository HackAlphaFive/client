import { FC, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../services/store';
import { createIPR, getIPRById, updateIPRById } from '../../services/middlewares/singleIPRQueries';

import { Link } from '@alfalab/core-components/link';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Gap } from '@alfalab/core-components/gap';

import { ReactComponent as ArrowIcon } from '../../assets/sidebar-icons/Arrow.svg';
import TitleInput from '../../components/TitleInput/TitleInput';
import StatusDropdown from '../../components/StatusDropdown/StatusDropdown';
import TableTask from '../../components/TableTask/TableTask';
import TabFiltrText from '../../components/TabFiltrText/TabFiltrText';
import { StatusList, StatusListRU } from '../../utils/types';

import styles from './FullIPR.module.css';
import { getCurrentIPRFromStore, getIdForCreate, getIntermediateStatus, getPhoto, getSingleIPRPending, getSingleIPRSuccess } from '../../services/selectors/singleIPRSelector';
import { translateStatus } from '../../utils/utils';
import { NAME_FOR_404 } from '../../utils/constants';
import { getUserRole } from '../../services/selectors/authSelector';
import { Spinner } from '@alfalab/core-components/spinner';
import TabFiltrStatus from '../../components/TabFiltrStatus/TabFiltrStatus';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { Radio } from '@alfalab/core-components/radio';
import TabForStatus from './TabForStatus';
import { useDispatch, useSelector } from '../../services/hooks';
import { setIntermideateStatus, setPhoto } from '../../services/slices/singleIPRSlice';
import { InputDesktop } from '@alfalab/core-components/input/desktop';
import { ReactComponent as PenIcon } from '../../assets/input-icons/lucide_pen.svg';
import { clearFilter, clearFilteringSubordLastName } from '../../services/slices/IPRsSlice';


export type TFormData = {
  title: string;
  status: StatusListRU;
};

const FullIPR: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const idFromURL = params.id;

  const isSuperior = useSelector(getUserRole);
  const currentIPR = useSelector(getCurrentIPRFromStore);
  const IPRPending = useSelector(getSingleIPRPending);
  const IPRSuccess = useSelector(getSingleIPRSuccess);

  const [mode, setMode] = useState<'empty' | 'existing'>('empty');

  const [isEdit, setIsEdit] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const defaultStatus = StatusListRU.NoStatus;
  const intermediateStatus = useSelector(getIntermediateStatus);
  const idForCreate = useSelector(getIdForCreate);
  const photo = useSelector(getPhoto);

  const [initialData, setInitialData] = useState<TFormData>({ title: '', status: defaultStatus });
  const [formData, setFormData] = useState<TFormData>({ title: '', status: defaultStatus });

  useEffect(() => {
    return () => {
      dispatch(clearFilter())
      dispatch(setPhoto(''))
    }
  }, []);

  useEffect(() => {
    setWasChanged(true)
    intermediateStatus && setFormData(prev => ({ ...prev, status: translateStatus(intermediateStatus, 'en-ru') as StatusListRU}))
  }, [intermediateStatus]);

  useEffect(() => {
    if (idFromURL && isSuperior !== undefined) {
      dispatch(getIPRById({ id: idFromURL, isSuperior }));
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
      dispatch(setIntermideateStatus(currentIPR.status));
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
    if (mode === 'existing' && currentIPR) {
      setFormData({
        title: currentIPR.title,
        status: translateStatus(currentIPR.status, 'en-ru') as StatusListRU,
      });
      dispatch(setIntermideateStatus(currentIPR.status));
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
      dispatch(createIPR({
        title: formData.title,
        description: 'empty',
        employee: idForCreate!,
      }));
      navigate(`/ipr`);
    }
  };

  if (IPRPending) {return <Spinner size='m' visible={true}/>}
  if (mode === 'existing' && !IPRPending && IPRSuccess === false) {return <h2>Что-то пошло не так! Но мы не знаем что! Попробуйте ещё раз позднее</h2>}
  return (<>
    <Link
      className={styles.iprLinkBack}
      view='primary'
      Component={RouterLink}
      href='/ipr'
      underline={false}
      leftAddons={<ArrowIcon />}
      onClick={() => dispatch(clearFilteringSubordLastName())}
    >
      Назад
    </Link>
    {isSuperior && (<>
    <h1 className='text text_type_heading1'>ИПР Сотрудника</h1>

    <div className={styles.iprContainer}>
      <form className={styles.form}>
        {mode === 'existing' ? (
          <textarea
            className={styles.inputEmployeeInfo}
            disabled
            value={currentIPR ? `${currentIPR.employee.fullname}\n${currentIPR.employee.position}` : ''}
          />
        ) : (
          <>
            <TabFiltrText needMagnifier={false} myLabel='ФИО' myWidth='initial' />
            <Gap size='2xs' />
            <p className='text text_type_small text_color_tooltip'>Введите ФИО сотрудника</p>
          </>
        )}

          <Gap size='xl' />
          {/* <InputDesktop
            size='xl'
            clear={true}
            defaultValue={currentIPR ? }
            rightAddons={isEdit ? undefined : <PenIcon />}
            block={true}
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          /> */}
          <TitleInput title={currentIPR ? currentIPR.title : undefined} onTitleChange={(title) => handleDataChange({ title })} />

          <Gap size='xl' />

          <TabForStatus
            mode={mode}
          />
        </form>
        {mode === 'empty' && photo && (
          <img src={photo} alt="Аватарка сотрудника" className={styles.avatar} />
        )}

        {mode ==='empty' && !photo && (<div className={`${styles.avatarStub} text text_type_middle text_color_tooltip`}>Фото</div>)}

        {mode === 'existing' && IPRSuccess && <img src={currentIPR?.employee.photo} alt="Аватарка сотрудника" className={styles.avatar} />}

      </div>
</>)}
      {isSuperior === false && (
        <h1 className='text text_type_heading1'>{currentIPR?.title}</h1>
      )}
      <Gap size='4xl' />
      <TableTask />

      <Gap size='4xl' />

      {isSuperior && (<div className={styles.buttonsWrapper}>
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
      </div>)}

  </>)
}

export default FullIPR;
