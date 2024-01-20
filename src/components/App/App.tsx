import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../Layout/Layout';
import HomePage from '../HomePage/HomePage';
import NotFound404Page from '../NotFound404Page/NotFound404Page';
import IPRPage from '../IPRPage/IPRPage';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='ipr' element={<IPRPage />}>

          </Route>
        </Route>

        <Route path='*' element={<NotFound404Page />} />
      </Routes>
    </>
  );
}

export default App;
