import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';

import styles from './App.module.css';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='ipr' element={<IPRPage />} />
        </Route>
        <Route path='*' element={<NotFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;
