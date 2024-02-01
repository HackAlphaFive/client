import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';
import styles from './App.module.css';
import { NAME_FOR_404, USER_SUBORNIDATE_1, USER_SUBORNIDATE_5, USER_SUBORNIDATE_7, USER_SUPERIOR } from './utils/constants';
import { useDispatch, useSelector } from './services/hooks';
import { checkUserAuth, login, setAnotherUsersInState } from './services/middlewares/authQueries';
import { getAuthPending, getAuthSuccess, getUserFromState, getUserPending, getUserSuccess } from './services/selectors/authSelector';

function App(): JSX.Element {
  console.log('выполнение App');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const authPending = useSelector(getAuthPending);
  /**
   * успешно ли получение токена
   */
  const authSuccess = useSelector(getAuthSuccess);

  const userPending = useSelector(getUserPending);
  const userSuccess = useSelector(getUserSuccess);
  const user = useSelector(getUserFromState);


  useEffect(() => {
    // Для локального сервера при старте приложения необходимо перенаправлять на маршрут '/',
    // т.к. по ум. сервер всё равно дописывает './client' (несмотря на условное определение BASENAME в index.tsx)
    if (process.env.NODE_ENV === 'development' && location.pathname === '/client') navigate('/');

    const controller = new AbortController();
    dispatch(login(USER_SUBORNIDATE_1.username, USER_SUBORNIDATE_1.password, controller.signal));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (authSuccess) dispatch(checkUserAuth());
  }, [authSuccess]);

  useEffect(() => {
    if (user) dispatch(setAnotherUsersInState(user));
  }, [user]);

  useEffect(() => {
    if (user) {
      /*fetch(`${config.baseUrl}/iprs/3/tasks/1/`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,

        },
        body: JSON.stringify({
          title: 'Купить слона!!!!',
          description: 'пять слов для строгого сервера',
          status: 'in_progress',
          // start_date: '2024-05-10',
          // end_date: '2024-06-07',
        }),
      });*/
      /*fetch(`${config.baseUrl}/tasks/1/comments/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify({
          text: 'Давайте устроим митап. Мы не обсудили критерии закупки. Размер ушей, стойкость запаха и тдтп',
        }),
      });*/
    }
  }, [user]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='ipr' element={<IPRPage />} />
          <Route path='ipr/:id' element={<div>КАКОЙ-ТО КОНКРЕТНЫЙ ИПР</div>} />
          <Route path='*' element={<Navigate to={`/${NAME_FOR_404}`} />} />
        </Route>
        <Route path={NAME_FOR_404} element={<NotFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;
