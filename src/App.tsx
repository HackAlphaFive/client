import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';
import styles from './App.module.css';
import { NAME_FOR_404, USER_SUBORNIDATE_1, USER_SUBORNIDATE_5, USER_SUBORNIDATE_7, USER_SUPERIOR } from './utils/constants';
import { useDispatch, useSelector } from './services/hooks';
import { checkUserAuth, getAnotherUser, login, setAnotherUsersInState } from './services/middlewares/authQueries';
import { getAuthPending, getAuthSuccess, getUserFromState, getUserPending, getUserSuccess } from './services/selectors/authSelector';
import { config } from './utils/api/api';
import { handleError } from './utils/utils';

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
    dispatch(login(USER_SUPERIOR.username, USER_SUPERIOR.password, controller.signal));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (!authPending && authSuccess) dispatch(checkUserAuth());

    return () => controller.abort();
  }, [authSuccess]);

  useEffect(() => {
    const controller = new AbortController();
    if (user) dispatch(setAnotherUsersInState(user));

    return () => controller.abort();
  }, [user]);

  /*useEffect(() => {
    .then(() => {
      fetch(`${config.baseUrl}/iprs/subordinates/`, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,

        },
        body: JSON.stringify({
          title: 'Развить себя всецело. Да',
          employee: 2,
          description: 'Описание? Не используется ведь в ИПР',
        }),
      });
    })
  }, []);*/

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
