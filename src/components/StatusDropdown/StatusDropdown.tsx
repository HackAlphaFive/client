import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Chevron } from '../../assets/Chevron.svg';
import { ReactComponent as CheckedIcon } from '../../assets/status-icons/checked.svg';
import { ReactComponent as UncheckedIcon } from '../../assets/status-icons/unchecked.svg';
import styles from './StatusDropdown.module.css';
import { StatusList, StatusListRU } from '../../utils/types';

const statuses = [
  { label: StatusListRU.Failed, value: StatusList.Failed },
  { label: StatusListRU.Done, value: StatusList.Done },
  { label: StatusListRU.Canceled, value: StatusList.Canceled }
];

type StatusDropdownProps = {
  currentStatus: string;
  onStatusChange: (status: string) => void;
};

const StatusDropdown: React.FC<StatusDropdownProps> = ({ currentStatus, onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);
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

  const handleStatusClick = (newStatus: { label: string; value: string }) => {
    onStatusChange(newStatus.value);
    setStatus(newStatus.value);
    setShown(false);
  };

  const currentStatusLabel = statuses.find(s => s.value === status)?.label || '';

  return (
    <div ref={statusRef} className={styles.statusDropdownContainer}>
      <div className={styles.statusLabel} onClick={() => setShown(!shown)}>
        <span>{currentStatusLabel}</span>
        <Chevron className={`${styles.chevronIcon} ${shown && styles.chevronIconRotated}`} />
      </div>
      {shown && (
        <ul className={styles.statusDropdown}>
          {statuses.map((s) => (
            <li className={`${styles.statusItem} ${s.value === 'Done' && styles.statusDone} ${s.value === 'Canceled' && styles.statusCanceled}`} key={s.value} onClick={() => handleStatusClick(s)}>
              {s.value === status ? <CheckedIcon/> : <UncheckedIcon/>}
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
