import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@alfalab/core-components/link';
import {ReactComponent as ArrowIcon} from '../../assets/sidebar-icons/Arrow.svg';
import TitleInput from '../../components/TitleInput/TitleInput';

import styles from './FullIPR.module.css';
import StatusDropdown from '../../components/StatusInput/StatusDropdown';

const ipr = {
  "id": 10,
  "title": "Качаем Soft skills ",
  "employee": {
    "fullName": "Иванов Иван Иванович",
    "position": "Ведущий специалист по тестированию",
    "avatar": "https://i.ibb.co/9tZzVnH/Rectangle-1.png"
  },
  "author": "Иванов Иван Иванович",
  "description": "Вот список всех книг, которые ты должен прочесть до пятницы...",
  "status": "Failed",
  "created_date": "2024-02-01T02:12:04.583Z",
  "start_date": "2024-02-01",
  "end_date": "2024-02-01"
}

const FullIPR: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Link
        view='primary'
        Component={RouterLink}
        href='/ipr'
        underline={false}
        onClick={() => navigate(-1)}
        leftAddons={<ArrowIcon/>}
        className={styles.iprLinkBack}
      >
        Назад
      </Link>
      <h1 className='text text_type_heading1'>ИПР Сотрудника</h1>
      <div className={styles.iprContainer}>
        <form className={styles.form}>
          <textarea value={`${ipr.employee.fullName}\n${ipr.employee.position}`} className={styles.inputEmployeeInfo} disabled/>
          <TitleInput title={ipr.title}/>
          <StatusDropdown/>
        </form>
          <img src={ipr.employee.avatar} alt="avatar" className={styles.avatar}/>
      </div>
    </div>
  )
}

export default FullIPR
