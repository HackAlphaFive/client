import React from 'react';
import UserTab from '../UserTab/UserTab';
import { ReactComponent as Chevron } from '../../assets/Chevron.svg';
import { ReactComponent as Add } from '../../assets/Add.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import styles from './IPRRow.module.css';

type IPRRowProps = {
  isLeader: boolean,
  tab: string,
  ipr: {
    employee: {
      fullName: string,
      position: string,
      avatar: string,
    },
    title?: string,
    status?: string,
    start_date?: string,
    end_date?: string,
  },
};

const IPRRow: React.FC<IPRRowProps> = ({ isLeader, tab, ipr }) => {
  // Функция для форматирования даты
  const formatDate = (isoString: string) => {
    const [yyyy, mm, dd] = isoString.split('-');
    return `${dd}.${mm}.${yyyy}`;
  };

  // Содержимое для вкладки "ИПР сотрудников"
  const renderEmployeeIPR = () => (
    <>
      <UserTab avatar={ipr.employee.avatar} position={ipr.employee.position} username={ipr.employee.fullName} cellExtraClassNameCell={styles.iprRowUserTab}/>
      {ipr.title ? (
          <>
            <div className={styles.iprRowTitle}>{ipr.title}</div>
            <div className={styles.iprRowStatus}>{ipr.status}</div>
            <button className={styles.iprRowBtn} onClick={() => {/* Логика перехода на страницу ИПР */}}>
              <Chevron className={styles.chevronIcon}/>
            </button>
          </>
        ) : (
          <>
            <div className={`${styles.iprRowTitle} ${styles.iprRowTitleEmpty}`}>У сотрудника нет ИПР</div>
            <div className={`${styles.iprRowStatus} ${styles.iprRowStatusEmpty}`}>Добавить ИПР</div>
            <button className={`${styles.iprRowBtn} ${styles.iprRowBtnAdd}`} onClick={() => {/* Логика добавления ИПР */}}>
              <Add className={styles.addIcon}/>
            </button>
          </>
        )
      }
    </>
)
  // Содержимое для вкладки "Мой ИПР"
  const renderMyIPR = () => (
    <>
      <div className={styles.iprRowTitle}>{ipr.title}</div>
      <div className={styles.iprRowDates}>
        <Calendar className={styles.calendarIcon}/>
        <span>
          {ipr.start_date && formatDate(ipr.start_date)}-{ipr.end_date && formatDate(ipr.end_date)}
        </span>
      </div>
      <div className={styles.iprRowStatus}>{ipr.status}</div>
      <button className={styles.iprRowBtn} onClick={() => {/* Логика перехода на страницу ИПР */}}>
        <Chevron className={styles.chevronIcon}/>
      </button>
    </>
  )

  return (
    <div className={styles.iprRow}>
      {tab === 'employeeIPR' && isLeader ? renderEmployeeIPR() : renderMyIPR()}
    </div>
  )
}

export default IPRRow;
