import React, { FC, ReactNode } from "react";
import TaskLine from "../TaskLine/TaskLine";
import styles from "./TableTask.module.css";
import { StatusList, StatusListRU } from "../../utils/types";
import Table from "../Table/Table";
import TabFiltrDate from "../TabFiltrDate/TabFiltrDate";
import TabFiltrStatus from "../TabFiltrStatus/TabFiltrStatus";
import { TTask } from "../../utils/api/types";
import { formatDate, getUniqId, translateStatus } from "../../utils/utils";

export const MockTasks = [{
  id: getUniqId(),
  title: 'Имя задачи',
  description: 'Описание',
  status: StatusList.InProgress,
  ipr: 'Такой-то ИПР',
  comments: [],
  created_date: '2023-01-30T12:00:00.000Z',
  start_date: '2023-01-30',
  end_date: '2023-04-25',
}];

for (let i = 0; i < 5; i++) {
  MockTasks.push({
    id: getUniqId(),
    title: 'Имя задачи',
    description: 'Описание',
    status: StatusList.InProgress,
    ipr: 'Такой-то ИПР',
    comments: [],
    created_date: '2023-01-30T12:00:00.000Z',
    start_date: '2023-01-30',
    end_date: '2023-04-25',
  });
}

type TProps = {
  children?: ReactNode;
  data?: Array<TTask>;
}

const TableTask: FC<TProps> = ({ children, data }): JSX.Element => {
  // const task = {
  //   text: "Как стать лидером: постановка целей и мотивация команды",
  //   date: "13.10.2024–25.10.2024",
  //   status: StatusListRU.InProgress,
  // };

  /*return (
      <ul className={styles.tableList}>
        <li className={styles.tableItem}>
          <TaskLine
            taskText={task.text}
            date={task.date}
            uniqueId={getUniqId()}
          />
        </li>
        <li className={styles.tableItem}>
          <TaskLine
            taskText={task.text}
            date={task.date}
            status={task.status}
            uniqueId={getUniqId()}
          />
        </li>
        <li className={styles.tableItem}>
          <TaskLine taskText={task.text} uniqueId={getUniqId()} />
        </li>
        <li className={styles.tableItem}>
          <TaskLine
            taskText={task.text}
            status={task.status}
            uniqueId={getUniqId()}
          />
        </li>
      </ul>
  );*/
  return (
    <Table
      gridParamsColumns='58.232% 20.884% 20.884%'
    >
      <div className={`${styles.titleWrapper} `}>
        <p className='text text_type_middle text_color_tooltip-dark'>Список задач</p>
      </div>
      <TabFiltrDate calendarWidth={290}/>
      <TabFiltrStatus width='188px' label='Статус задачи'/>
      {MockTasks && MockTasks.map(task => {
        const start = formatDate(task.start_date);
        const end = formatDate(task.end_date);
        return ( <TaskLine
                    classNameLine={styles.row}
                    descriptionText={task.description}
                    taskText={task.title}
                    date={`${start}–${end}`}
                    status={translateStatus(task.status, 'en-ru')}
                    uniqueId={task.id}
                  />)
      })}
      {children}
    </Table>
  )
};

export default TableTask;
