import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';
import styles from './App.module.css';
import { NAME_FOR_404, USER_SUPERIOR } from './utils/constants';
import { useDispatch } from './services/hooks';
import { checkUserAuth, getAnotherUser, login } from './services/middlewares/authQueries';

function App(): JSX.Element {
  console.log('рендер всего приложения');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Для локального сервера при старте приложения необходимо перенаправлять на маршрут '/',
    // т.к. по ум. сервер всё равно дописывает './client' (несмотря на условное определение BASENAME в index.tsx)
    if (process.env.NODE_ENV === 'development' && location.pathname === '/client') navigate('/');

    const controller = new AbortController();
    dispatch(login(USER_SUPERIOR.username, USER_SUPERIOR.password, controller.signal));
    dispatch(checkUserAuth(controller.signal));

    // Получаем несколько подчиненных для возможности переключения аккаунтов
    dispatch(getAnotherUser({id: 2, signal: controller.signal})); // USER_SUBORNIDATE_1
    dispatch(getAnotherUser({id: 3, signal: controller.signal})); // USER_SUBORNIDATE_2
    dispatch(getAnotherUser({id: 4, signal: controller.signal})); // USER_SUBORNIDATE_3

    return () => controller.abort();
  }, []);

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
