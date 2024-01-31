import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';
import styles from './App.module.css';
import { NAME_FOR_404 } from './utils/constants';

function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  // Для локального сервера при старте приложения необходимо перенаправлять на маршрут '/',
  // т.к. по ум. сервер всё равно дописывает './client' (несмотря на условное определение BASENAME в index.tsc)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && location.pathname === '/client') navigate('/');
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
