import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NotFound404Page from './pages/NotFound404Page/NotFound404Page';
import IPRPage from './pages/IPRPage/IPRPage';
import styles from './App.module.css';
import FullIPR from './pages/FullIPR/FullIPR';
import { NAME_FOR_404, USER_SUBORNIDATE_1, USER_SUBORNIDATE_5, USER_SUBORNIDATE_7, USER_SUPERIOR } from './utils/constants';
import { useDispatch, useSelector } from './services/hooks';
import { checkUserAuth, login, setAnotherUsersInState } from './services/middlewares/authQueries';
import { getAuthPending, getAuthSuccess, getUserFromState, getUserPending, getUserSuccess } from './services/selectors/authSelector';
import { config } from './utils/api/api';

function App(): JSX.Element {
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
    // dispatch(login(USER_SUPERIOR.username, USER_SUPERIOR.password, controller.signal));
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
      // TASKS ------------------------------------------------------------------
      /*fetch(`${config.baseUrl}/iprs/28/tasks/82/`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,

        },
        body: JSON.stringify({
          // title: 'Купить слона!!!!',
          // description: 'пять слов для строгого сервера',
          status: 'In progress',
          // start_date: '2024-05-10',
          // end_date: '2024-06-07',
        }),
      });*/
      /*fetch(`${config.baseUrl}/iprs/28/tasks/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
      });*/
      /*fetch(`${config.baseUrl}/iprs/28/tasks/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify({
          title: "title for task",
          description: "descrip",
          start_date: '2024-04-04',
          end_date: '2024-04-04',
          ipr: 1,
        }),
      });*/
      // IPRS ------------------------------------------------------------------
      /*fetch(`${config.baseUrl}/iprs/subordinates/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify({
          title: "title",
          description: "descrip",
          // start_date: '2024-04-04',
          // end_date: '2024-04-04',
          employee: 2,
        }),
      });*/
      /*fetch(`${config.baseUrl}/iprs/subordinates/28/`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify({
          // title: "title",
          // description: "descrip",
          // start_date: '2024-04-04',
          // end_date: '2024-04-04',
          // employee: 2,
          status: 'No status',
        }),
      });*/
      /*fetch(`${config.baseUrl}/iprs/my/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
      });*/
      // COMMENTS ------------------------------------------------------------------
      /*fetch(`${config.baseUrl}/tasks/82/comments/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
      });
      fetch(`${config.baseUrl}/tasks/82/comments/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: localStorage.getItem('accessToken')!,
        },
        body: JSON.stringify({
          text: "text comment qwert",
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

          <Route path='ipr/edit' element={<FullIPR />} />
          <Route path='ipr/:id' element={<FullIPR />} />

          <Route path='*' element={<Navigate to={`/${NAME_FOR_404}`} />} />
        </Route>

        <Route path={NAME_FOR_404} element={<NotFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;
