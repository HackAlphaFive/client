import React from 'react';
import UserTab from '../UserTab/UserTab';
import { ReactComponent as Chevron } from '../../assets/Chevron.svg';
import { ReactComponent as Add } from '../../assets/Add.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import styles from './IPRRow.module.css';
import { formatDate, translateStatus } from '../../utils/utils';
import { TUser, T_IPR } from '../../utils/api/types';
import { useNavigate } from 'react-router';

type IPRRowProps = {
  isLeader: boolean | undefined;
  tab: 'employeeIPR' | 'myIPR';
  ipr?: T_IPR;
  /**
   * передавать, если нужно отрендерить строку для подчиненного без ИПР
   */
  employee?: TUser;
};

const IPRRow: React.FC<IPRRowProps> = ({ isLeader, tab, ipr, employee }) => {
  const navigate = useNavigate();

  // Содержимое для вкладки "ИПР сотрудников"
  const renderEmployeeIPR = () => (
    <>
      <UserTab
        // TODO не лучшее решение
        avatar={ipr ? ipr.employee.photo : employee ? employee.photo : ''}
        position={ipr ? ipr.employee.position : employee ? employee.position : 'Сотрудник не найден'}
        username={ipr ? ipr.employee.fullName : employee ? `${employee.last_name} ${employee.first_name} ${employee.patronymic ?? ''}` : ''}
        cellExtraClassNameCell={styles.iprRowUserTab}
      />

      {ipr ? (
        <>
          <div className={styles.iprRowTitle}>{ipr.title}</div>
          <div className={styles.iprRowStatus}>{translateStatus(ipr.status, 'en-ru')}</div>
          <button className={styles.iprRowBtn} onClick={() => {/* Логика перехода на страницу ИПР */ }}>
            <Chevron className={styles.chevronIcon} />
          </button>
        </>
      ) : (
        <>
          <div className={`${styles.iprRowTitle} ${styles.iprRowTitleEmpty}`}>У сотрудника нет ИПР</div>
          <div className={`${styles.iprRowStatus} ${styles.iprRowStatusEmpty}`}>Добавить ИПР</div>
          <button className={`${styles.iprRowBtn} ${styles.iprRowBtnAdd}`} onClick={() => {/* Логика добавления ИПР */ }}>
            <Add className={styles.addIcon} />
          </button>
        </>
      )
      }
    </>
  )

  // Содержимое для вкладки "Мой ИПР"
  const renderMyIPR = () => {
    if (ipr) {
      return (
        <>
          <div className={styles.iprRowTitle}>
            {ipr.title}
          </div>

          <div className={styles.iprRowDates}>
            <Calendar className={styles.calendarIcon} />
            <span>
              {ipr.start_date && formatDate(ipr.start_date)}-{ipr.end_date && formatDate(ipr.end_date)}
            </span>
          </div>

          <div className={styles.iprRowStatus}>
            {ipr.status}
          </div>

          {/* Кнопка перехода на страницу ИПР */}
          <button
            className={styles.iprRowBtn}
            onClick={() => {
              navigate(`./${ipr.id}`);
            }}
          >
            <Chevron className={styles.chevronIcon} />
          </button>
        </>
      );
    } else {
      return (<h3>У вас нет ИПР</h3>);
    }
  }

  // Итоговое решение о рендере
  return (
    <div className={styles.iprRow}>
      {isLeader === undefined ? (
        <p>
          Вы не авторизованы
        </p>
      ) : (
        tab === 'employeeIPR' && typeof isLeader === "boolean" && isLeader ? renderEmployeeIPR() : renderMyIPR()
      )}
    </div>
  );
}

export default IPRRow;
