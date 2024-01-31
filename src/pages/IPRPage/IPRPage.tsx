import React from 'react';
import { Outlet } from 'react-router';
import IPRRow from '../../components/IPRRow/IPRRow';
import TaskTable from '../../components/TaskTable/TaskTable';

const IPRExample = {
  "id": 10,
      "title": "Качаем Soft skills",
      "employee": {
        "fullName": "Иванов Иван Иванович",
        "position": "Ведущий специалист по тестированию",
        "avatar": "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg"
      },
      "author": "Иванов Иван Иванович",
      "description": "Вот список всех книг, которые ты должен прочесть до пятницы...",
      "status": "Failed",
      "created_date": "2024-01-29T03:31:55.675Z",
      "start_date": "2024-01-29",
      "end_date": "2024-01-29"
}

const noIPRExample = {
  "id": 10,
      "employee": {
        "fullName": "Иванов Иван Иванович",
        "position": "Ведущий специалист по тестированию",
        "avatar": "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg"
      },
}

function IPRPage() {
  return (
    <div>
      {/* Для руководителя на вкладке "ИПР сотрудников" */}
    {/* <IPRRow isLeader={true} tab="employeeIPR" ipr={IPRExample} /> */}
      {/* Если сотрудник без ИПР */}
    {/* <IPRRow isLeader={true} tab="employeeIPR" ipr={noIPRExample} /> */}
      {/* Для руководителя на вкладке "Мой ИПР" */}
    {/* <IPRRow isLeader={true} tab="myIPR" ipr={IPRExample} /> */}
      {/* Для сотрудника (только вкладка "Мой ИПР") */}
    {/* <IPRRow isLeader={false} tab="myIPR" ipr={IPRExample} /> */}
    <TaskTable />
      <Outlet />
    </div>
  )
}

export default IPRPage;
