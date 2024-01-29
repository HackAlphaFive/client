import React from 'react';
import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';

import styles from './App.module.css';

function App(): JSX.Element {
  if (process.env.NODE_ENV === 'development') redirect('/');
  const nameFor404 = '404';

  return (
    <div className={styles.app}>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='ipr' element={<IPRPage />}>
            <Route path='my' element={<div>MyIPRS</div>} />
            <Route path='subordinates' element={<div>SubordinatesIPRS</div>} />
            <Route path='*' element={<Navigate to={`/${nameFor404}`} />} />
          </Route>
          <Route path='*' element={<Navigate to={`/${nameFor404}`} />} />
        </Route>
        <Route path={nameFor404} element={<NotFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;
