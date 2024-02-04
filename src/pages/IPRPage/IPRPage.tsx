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
import { getIPRQuery, getSubordIPRsFromStore, getMyIPRsFromStore, getMyIPRsPending, getSubordIPRsPending, getFilteringPage } from '../../services/selectors/IPRsSelector';
import { useNavigate } from 'react-router';
import { clearFilter, setFilteringPage } from '../../services/slices/IPRsSlice';
import { Pagination } from '@alfalab/core-components/pagination';
import styles from './IPRPage.module.css';
import { clearCurrentIPR } from '../../services/slices/singleIPRSlice';

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

  const myIPRsPending = useSelector(getMyIPRsPending);
  const myIPRs = useSelector(getMyIPRsFromStore);
  const subordIPRsPending = useSelector(getSubordIPRsPending);
  const subordIPRs = useSelector(getSubordIPRsFromStore);

  const IPRQuery = useSelector(getIPRQuery);

  const filtrByPage = useSelector(getFilteringPage);

  // в компоненте Pagination нумерация начинается с нуля, иначе некорректное отображение
  const [pagesCountIndex, setPagesCountIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  const handlePageChange = (payload: number) => {
    dispatch(setFilteringPage(payload + 1));
  };


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
    filtrByPage && setCurrentPageIndex(filtrByPage - 1);
  });

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
    // ↓↓ фикс галочки у пагинации, когда ты за рукля переключаешься на свои ипр, а у тебя их на одну страницу
    setPagesCountIndex(0);
    setCurrentPageIndex(0);
  }, [selectedId]);

  useEffect(() => {
    if (selectedId === 'me') dispatch(getMyIPRs(IPRQuery));
    if (selectedId === 'subordinates') dispatch(getSubordIPRs(IPRQuery));
  }, [IPRQuery, selectedId]);

  useEffect(() => {
    if (selectedId === 'me' && !myIPRsPending) {
      setPagesCountIndex(myIPRs.count === 0 ? 0 : (Math.ceil(myIPRs.count / 5) - 1)); // index становился отрицательным
      let currentPageIndex: number;
      switch(myIPRs.next) {
        case null:
          currentPageIndex = pagesCountIndex === 0 ? 0 : pagesCountIndex;
          break;
        default:
          switch(myIPRs.previous) {
            case null:
              currentPageIndex = 0;
              break;
            default:
              const index_of_substr_page_for_next = myIPRs.next.indexOf('page='); // a1
              const index_of_substr_pageNum_for_next = index_of_substr_page_for_next + 5; // a2
              const next_page_index = Number(myIPRs.next.slice(index_of_substr_pageNum_for_next, index_of_substr_pageNum_for_next + 1)) - 1 // TODO если номер след. страницы из двух цифр - будут баги

              const index_of_substr_page_for_previous = myIPRs.previous.indexOf('page=');
              const index_of_substr_pageNum_for_previous = index_of_substr_page_for_previous + 5;
              const previous_page_index = Number(myIPRs.next.slice(index_of_substr_pageNum_for_previous, index_of_substr_pageNum_for_previous + 1)) - 1 // TODO

              currentPageIndex = (next_page_index - previous_page_index);
          }
      }
      setCurrentPageIndex(currentPageIndex);
    }
    if (selectedId === 'subordinates' && !subordIPRsPending) {
      setPagesCountIndex(subordIPRs.count === 0 ? 0 : (Math.ceil(subordIPRs.count / 5) - 1));
      let currentPageIndex: number;
      switch(subordIPRs.next) {
        case null:
          currentPageIndex = pagesCountIndex === 0 ? 0 : pagesCountIndex;
          break;
        default:
          switch(subordIPRs.previous) {
            case null:
              currentPageIndex = 0;
              break;
            default:
              const index_of_substr_page_for_next = subordIPRs.next.indexOf('page='); // a1
              const index_of_substr_pageNum_for_next = index_of_substr_page_for_next + 5; // a2
              const next_page_index = Number(subordIPRs.next.slice(index_of_substr_pageNum_for_next, index_of_substr_pageNum_for_next + 1)) - 1 // TODO если номер след. страницы из двух цифр - будут баги

              const index_of_substr_page_for_previous = subordIPRs.previous.indexOf('page=');
              const index_of_substr_pageNum_for_previous = index_of_substr_page_for_previous + 5;
              const previous_page_index = Number(subordIPRs.next.slice(index_of_substr_pageNum_for_previous, index_of_substr_pageNum_for_previous + 1)) - 1 // TODO

              currentPageIndex = (next_page_index - previous_page_index);
          }
      }
      setCurrentPageIndex(currentPageIndex);
    }
  }, [myIPRs, subordIPRs, myIPRsPending, subordIPRsPending]);

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
            onClick={() => {
              dispatch(clearCurrentIPR());
              navigate('./create')
            }}
          >
            Создать новый ИПР
          </ButtonDesktop>
          <Gap size='xl' />

          <TableIPRForSubord data={subordIPRs.results} />

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
          currentPageIndex={currentPageIndex}
          pagesCount={pagesCountIndex}
          onPageChange={(payload) => handlePageChange(payload)}

          className={styles.paginationButton}
          hideArrows={true}
          view='default'
        />
      </div>
    </>
  );
}

export default IPRPage;
