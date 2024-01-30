import React, { FC } from "react";
import TaskLine from "../../components/TaskLine/TaskLine";
import styles from "./TaskTable.module.css";
import { getUniqId } from "../../utils/utils";
import { StatusListRU } from "../../utils/types";

const TaskTable: FC = () => {
  const task = {
    text: "Как стать лидером: постановка целей и мотивация команды",
    date: "13.10.2024–25.10.2024",
    status: StatusListRU.InProgress,
  };

  return (
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
  );
};

export default TaskTable;
