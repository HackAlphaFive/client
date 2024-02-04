import React, { useEffect, useState } from 'react';
import { TabsDesktop, Tab } from '@alfalab/core-components/tabs/desktop';
import { Gap } from '@alfalab/core-components/gap';
import { useDispatch, useSelector } from '../../services/hooks';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { ReactComponent as Add } from '../../assets/Add.svg';
import UserTab from '../../components/UserTab/UserTab';
import TableIPRForSubord from '../../components/TableIPRForSubord/TableIPRForSubord';
import TableMyIPR from '../../components/TableMyIPR/TableMyIPR';
import { getUserRole, getUserSimplified } from '../../services/selectors/authSelector';
import { getMyIPRs, getSubordIPRs } from '../../services/middlewares/IPRsQueries';
import { getIPRQuery, getSubordIPRsFromStore, getMyIPRsFromStore } from '../../services/selectors/IPRsSelector';
import { useNavigate } from 'react-router';
import { clearFilter } from '../../services/slices/IPRsSlice';
import { Pagination } from '@alfalab/core-components/pagination';
import styles from './IPRPage.module.css';

function IPRPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const TABS = [
    { title: 'ИПР сотрудников', id: 'subordinates' },
    { title: 'Мой ИПР', id: 'me' },
  ];
  const EMPLOYEE_TABS = [
    { title: 'Мой ИПР', id: 'me' },
  ];
  const [tabs, setTabs] = useState(TABS);
  const [selectedId, setSelectedId] = useState<string | number>(tabs[0].id);


  const user = useSelector(getUserSimplified);
  const isSupervisor = useSelector(getUserRole);

  const myIPRs = useSelector(getMyIPRsFromStore);
  const subordIPRs = useSelector(getSubordIPRsFromStore);
  const IPRQuery = useSelector(getIPRQuery);

  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  const handlePageChange = () => {};


  /**
   * обработчик смены вкладки "ИПР сотрудников" – "Мой ИПР"
   */
  const handleChange = (
    event: React.MouseEvent<Element, MouseEvent>,
    { selectedId }: { selectedId: string | number }
  ) => {
    setSelectedId(selectedId);
  };


  useEffect(() => {
    if (!isSupervisor) {
      setTabs(EMPLOYEE_TABS);
      setSelectedId(EMPLOYEE_TABS[0].id);
    } else {
      setTabs(TABS);
      setSelectedId(TABS[0].id);
    }
  }, [isSupervisor]);

  useEffect(() => {
    dispatch(clearFilter()); // при смене вкладки очищаются настройки фильтрации
  }, [selectedId]);

  useEffect(() => {
    if (selectedId === 'me') dispatch(getMyIPRs(IPRQuery));
    if (selectedId === 'subordinates') dispatch(getSubordIPRs(IPRQuery));
  }, [IPRQuery, selectedId]);

  useEffect(() => {
    if (selectedId === 'me') {

    }
    if (selectedId === 'subordinates') {

    }
  }, [myIPRs, subordIPRs]);

  return (
    <>
      <h1 className='text text_type_heading1'>Индивидиуальный план развития (ИПР)</h1>
      <Gap size='4xl' />
      <TabsDesktop
        view='primary'
        size='xl'
        selectedId={selectedId}
        onChange={handleChange}
        scrollable={false}
      >
        {tabs.map((item) => (
          <Tab title={item.title} id={item.id} key={item.id} />
        ))}
      </TabsDesktop>

      {selectedId === 'subordinates' && (
        <>
          <Gap size='2xl' />
          <ButtonDesktop
            view='accent'
            leftAddons={<Add />}
            onClick={() => navigate('./edit')}
          >
            Создать новый ИПР
          </ButtonDesktop>
          <Gap size='xl' />

          <TableIPRForSubord data={subordIPRs} />

        </>
      )}

      {selectedId === 'me' && (
        <>
          <Gap size='3xl' />
          <UserTab
            // TODO добавить условный рендеринг
            avatar={user.photo!}
            username={user.fullname || 'Не найдено'}
            position={user.position || 'Не найдено'}
          />
          <Gap size='4xl' />

          <TableMyIPR data={myIPRs.results} />
        </>
      )}

      <Gap size='2xl'/>
      <div id='paginationIPR' className={styles.paginationWrapper}>
        <Pagination
          currentPageIndex={currentPage}
          pagesCount={pagesCount}
          onPageChange={handlePageChange}

          className={styles.paginationButton}
          hideArrows={true}
          view='default'
        />
      </div>
    </>
  );
}

export default IPRPage;
