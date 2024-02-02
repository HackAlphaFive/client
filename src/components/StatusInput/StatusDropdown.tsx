import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Chevron } from '../../assets/Chevron.svg';
import {ReactComponent as CheckedIcon} from '../../assets/status-icons/checked.svg';
import {ReactComponent as UncheckedIcon} from '../../assets/status-icons/unchecked.svg';
import styles from './StatusDropdown.module.css';

const statuses = [
  { label: 'Отсутствует', value: 'NoStatus' },
  { label: 'Не выполнено', value: 'Failed' },
  { label: 'В работе', value: 'InProgress' },
  { label: 'Выполнен', value: 'Done' },
  { label: 'Отменен', value: 'Canceled' }
];

const StatusDropdown = () => {
  const [status, setStatus] = useState(statuses[0]);
  const [shown, setShown] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShown(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleStatusClick = (newStatus: typeof statuses[number]) => {
    setStatus(newStatus);
    setShown(false);
  };

  return (
    <div ref={statusRef} className={styles.statusDropdownContainer}>
      <div className={styles.statusLabel} onClick={() => setShown(!shown)}>
        <span>{status.label}</span>
        <Chevron className={`${styles.chevronIcon} ${shown && styles.chevronIconRotated}`} />
      </div>
      {shown && (
        <ul className={styles.statusDropdown}>
          {statuses.map((s) => (
            <li className={`${styles.statusItem} ${s.value === 'Done' && styles.statusDone} ${s.value === 'Canceled' && styles.statusCanceled}`} key={s.value} onClick={() => handleStatusClick(s)}>
              {s.value === status.value ? <CheckedIcon/> : <UncheckedIcon/>}
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <span className={styles.statusCaption}>Укажите статус ИПР</span>
    </div>
  );
};

export default StatusDropdown;
