import React, { FC } from "react";
import TaskLine from '../../components/TaskLine/TaskLine';
import styles from "./TaskTable.module.css";

const TaskTable: FC = () => {
  const task = {
    text: "Как стать лидером: постановка целей и мотивация команды",
    date: "13.10.2024–25.10.2024",
    status: "В работе",
  };

  return (
      <ul className={styles.tableList}>
        <li className={styles.tableItem}><TaskLine taskText={task.text} date={task.date} status={task.status} /></li>
        <li className={styles.tableItem}><TaskLine taskText={task.text} date={task.date} status={task.status} /></li>
        <li className={styles.tableItem}><TaskLine taskText={task.text} status={task.status} /></li>
        <li className={styles.tableItem}><TaskLine taskText={task.text} status={task.status} /></li>
      </ul>
  );
};

export default TaskTable;
