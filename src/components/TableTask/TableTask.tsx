import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import TaskLine from "../TaskLine/TaskLine";
import styles from "./TableTask.module.css";
import { StatusList, StatusListRU } from "../../utils/types";
import Table from "../Table/Table";
import TabFiltrDate from "../TabFiltrDate/TabFiltrDate";
import TabFiltrStatus from "../TabFiltrStatus/TabFiltrStatus";
import { TTask } from "../../utils/api/types";
import { formatDate, getUniqId, translateStatus } from "../../utils/utils";
import { PlusMediumMIcon } from "@alfalab/icons-glyph/PlusMediumMIcon";
import { useDispatch, useSelector } from "../../services/hooks";
import { getUserRole } from "../../services/selectors/authSelector";
import { ButtonDesktop } from "@alfalab/core-components/button/desktop";
import {
  getChangeTaskSuccess,
  getCreatedTaskSuccess,
  getDeleteTaskSuccess,
  getTasksQuery,
  getTasksToIPR,
  isTemplate,
  templateTask,
} from "../../services/selectors/taskSelector";
import {
  setTemplate,
  setTemplateElement,
} from "../../services/slices/taskSlice";
import { useParams } from "react-router";
import { getTaskByIdIPR } from "../../services/middlewares/taskQueries";

export const MockTasks = [
  {
    id: getUniqId(),
    title: "Имя задачи",
    description: "Описание",
    status: StatusList.InProgress,
    ipr: "Такой-то ИПР",
    comments: [],
    created_date: "2023-01-30T12:00:00.000Z",
    start_date: "2023-01-30",
    end_date: "2023-04-25",
  },
];

for (let i = 0; i < 5; i++) {
  MockTasks.push({
    id: getUniqId(),
    title: "Имя задачи",
    description: "Описание",
    status: StatusList.InProgress,
    ipr: "Такой-то ИПР",
    comments: [],
    created_date: "2023-01-30T12:00:00.000Z",
    start_date: "2023-01-30",
    end_date: "2023-04-25",
  });
}

type TProps = {
  children?: ReactNode;
  data?: Array<TTask>;
};

const TableTask: FC<TProps> = ({ children, data }): JSX.Element => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const isSupervisor = useSelector(getUserRole);
  const template = useSelector(isTemplate);
  const templateElement = useSelector(templateTask);
  const tasksQuery = useSelector(getTasksQuery)
  const tasksToIpr = useSelector(getTasksToIPR)
  const taskIsChange = useSelector(getChangeTaskSuccess)
  const taskIsCreated = useSelector(getCreatedTaskSuccess)
  const taskIsDelete = useSelector(getDeleteTaskSuccess)

  useEffect(() => {
    if(id) dispatch(getTaskByIdIPR({tasksQuery, id}))
  },[taskIsChange, taskIsCreated, taskIsDelete])
  const addTaskButton = () => {
      dispatch(setTemplate(true));
      dispatch(
        setTemplateElement({
          isTemplate: true,
          classNameLine: styles.row,
          taskText: `Задача №${tasksToIpr.length + 1}`,
          status: StatusList.NoStatus,
          descriptionText: `Описание задачи №${tasksToIpr.length + 1}`,
          uniqueId: getUniqId(),
        })
      );
  };
  return (
    <Table
      gridParamsColumns='58.232% 20.884% 20.884%'
    >
      <div className={`${styles.titleWrapper} `}>
        <p className="text text_type_middle text_color_tooltip-dark">
          Список задач
        </p>
      </div>
      <TabFiltrDate calendarWidth={290} />
      <TabFiltrStatus width="188px" label="Статус задачи" />
      {tasksToIpr &&
        tasksToIpr.map((task:TTask, index:number) => {
          const start = formatDate(task.start_date);
          const end = formatDate(task.end_date);
          return (
            <TaskLine
              key={index}
              classNameLine={styles.row}
              descriptionText={task.description}
              startTask={start}
              endTask={end}
              taskText={task.title}
              date={`${start}-${end}`}
              status={task.status}
              uniqueId={task.id}
            />
          );
        })}
      {template && templateElement !== null && (
        <TaskLine
          isTemplate={templateElement.isTemplate}
          classNameLine={templateElement.classNameLine}
          taskText={templateElement.taskText}
          status={templateElement.status}
          descriptionText={templateElement.descriptionText}
          uniqueId={templateElement.uniqueId}
        />
      )}
      {isSupervisor && (
        <ButtonDesktop
          onClick={() => addTaskButton()}
          className={styles.buttonAddTask}
          textResizing="hug"
        >
          <p className={styles.textAddTask}>
            {" "}
            <PlusMediumMIcon fill="#EF3124" />
            Добавить новую задачу
          </p>
        </ButtonDesktop>
      )}
      {children}
    </Table>
  );
};

export default TableTask;
