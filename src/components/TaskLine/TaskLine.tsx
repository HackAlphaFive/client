import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./TaskLine.module.css";
import Сomments from "../Сomments/Сomments";
import { ChevronDownMIcon } from "@alfalab/icons-glyph/ChevronDownMIcon";
import { CalendarMIcon } from "@alfalab/icons-glyph/CalendarMIcon";
import { DotsThreeVerticalMIcon } from "@alfalab/icons-glyph/DotsThreeVerticalMIcon";
import { Popover } from "@alfalab/core-components/popover";
import { IconButton } from "@alfalab/core-components/icon-button";
import { Calendar } from "@alfalab/core-components/calendar";
import { Radio } from "@alfalab/core-components/radio";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { StatusList, StatusListRU } from "../../utils/types";
import TaskForm from "../TaskForm/TaskForm";
import { getUserRole } from "../../services/selectors/authSelector";
import { useDispatch, useSelector } from "../../services/hooks";
import { translateStatus } from "../../utils/utils";
import {
  deleteTask,
  patchTaskByEmployee,
} from "../../services/middlewares/taskQueries";
import { useParams } from "react-router";
import {
  setTemplate,
  setTemplateElement,
} from "../../services/slices/taskSlice";
import { getComments } from "../../services/middlewares/commentsQueries";
import {
  getCommentsContainer,
  getSendCommentSuccess,
} from "../../services/selectors/commentsSelector";

type TProps = {
  descriptionText: string;
  taskText: string;
  startTask?: string;
  endTask?: string;
  date?: string;
  status: StatusList;
  uniqueId: number;
  classNameLine?: string;
  isTemplate?: boolean;
};

const TaskLine: FC<TProps> = ({
  descriptionText,
  taskText,
  startTask,
  endTask,
  date,
  status,
  uniqueId,
  classNameLine,
  isTemplate,
}) => {
  //стейт для выбора статуса
  const [valueStatus, setValueStatus] = useState<StatusList>(status);
  //стейт для открытия и закрытия поповера с удалением/редактированием
  const [isOpenEdit, setOpenEdit] = useState(false);

  //стейт для записи элемента к которму крепится поповер с удалением/редактированием
  const [elemEdit, setElementEdit] = useState<null | HTMLButtonElement>(null);

  //стейт для открытия и закрытия поповера с календарем
  const [isOpenCalendar, setOpenCalendar] = useState(false);

  //стейт для записи элемента к которму крепится поповер с календарем
  const [elemCalendar, setElementCalendar] = useState<null | HTMLDivElement>(
    null
  );
  //стейт для открытия и закрытия поповера со статусами
  const [isOpenStatus, setOpenStatus] = useState(false);

  //стейт для записи элемента к которму крепится поповер со статусами
  const [elemStatus, setElementStatus] = useState<null | HTMLParagraphElement>(
    null
  );

  //стейт для открытия и закрытия поповера с календарем
  const [isOpenTask, setOpenTask] = useState(false);

  //стейт для записи элемента к которму крепится поповер с календарем
  const [elemTask, setElementTask] = useState<null | HTMLDivElement>(null);

  //стейт для записи конечной даты
  const [from, setFrom] = useState<number>();

  //стейт для записи начальной даты
  const [to, setTo] = useState<number>();

  const [startDate, setStartDate] = useState<string | undefined>(startTask);
  const [endDate, setEndDate] = useState<string | undefined>(endTask);

  //Стейт для редактирования
  const [editMode, setEditMode] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [dateText, setDateText] = useState(
    date ? date : "Укажите диапазон дат"
  );
  const isSupervisor = useSelector(getUserRole);
  const commentSend = useSelector(getSendCommentSuccess);
  const dispatch = useDispatch();
  const { id } = useParams();
  const comments = useSelector(getCommentsContainer);


  useEffect(() => {
    if (!isOpenCalendar && !isOpenEdit && !isOpenStatus && !isOpenTask) {
      return;
    }

    //Массив всех id
    const arrOfId = [
      uniqueId + "editPopover",
      uniqueId + "calendarPopover",
      uniqueId + "statusPopover",
      uniqueId + "taskPopover",
      uniqueId + "editButton",
      uniqueId + "calendarButton",
      uniqueId + "statusButton",
      uniqueId + "taskButton",
      "modalConfirm",
    ];
    //Функция закрытия поповеров при клике вне
    const closePopover = (
      e: MouseEvent,
      popoverId: string,
      buttonId: string,
      state: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const popover = document.getElementById(popoverId) as HTMLElement;
      const button = document.getElementById(buttonId) as HTMLElement;
      if (
        !(
          e.composedPath().includes(popover) ||
          e.composedPath().includes(button)
        )
      ) {
        if (isOpenTask) {
          return;
        } else {
          state(false);
        }
      }
    };

    //Функция закрытия задачи при клике вне, но если открывать выпадашки, то задача не будет закрываться
    const closeTask = (e: MouseEvent, allId: string[]) => {
      if (isTemplate) {
        setEditMode(true);
      }
      const arrElements = allId.map((id) =>
        e.composedPath().includes(document.getElementById(id)!)
      );
      const findTrue = arrElements.find((item) => item === true);

      if (arrElements[3]) {
        setOpenEdit(false);
        setOpenCalendar(false);
        setOpenStatus(false);
      } else if (arrElements[5]) {
        setOpenEdit(false);
      } else if (arrElements[4]) {
        setOpenCalendar(false);
      }

      if (!findTrue) {
        if (editMode && isTemplate) {
          handleSave();
        } else if (editMode) {
          handleSave();
        } else {
          setOpenTask(false);
          setOpenEdit(false);
          setOpenCalendar(false);
          setOpenStatus(false);
          window.scrollTo({
            top: 198,
            behavior: "smooth",
          });
        }
      }
    };
    //Ниже функции колбэки, чтобы снимать слушатель
    const editCallback = (e: MouseEvent) => {
      closePopover(
        e,
        uniqueId + "editPopover",
        uniqueId + "editButton",
        setOpenEdit
      );
    };
    const calendarCallback = (e: MouseEvent) => {
      closePopover(
        e,
        uniqueId + "calendarPopover",
        uniqueId + "calendarButton",
        setOpenCalendar
      );
    };
    const statusCallback = (e: MouseEvent) => {
      closePopover(
        e,
        uniqueId + "statusPopover",
        uniqueId + "statusButton",
        setOpenStatus
      );
    };
    const taskCallback = (e: MouseEvent) => {
      closeTask(e, arrOfId);
    };

    isOpenEdit && document.addEventListener("click", editCallback);
    isOpenCalendar && document.addEventListener("click", calendarCallback);
    isOpenStatus && document.addEventListener("click", statusCallback);
    isOpenTask && document.addEventListener("click", taskCallback);

    return () => {
      document.removeEventListener("click", editCallback);
      document.removeEventListener("click", calendarCallback);
      document.removeEventListener("click", statusCallback);
      document.removeEventListener("click", taskCallback);
    };
  }, [isOpenCalendar, isOpenEdit, isOpenStatus, isOpenTask, editMode]);

  //Функция обработчик диапазона дат
  const handlerCalendar = (e?: number) => {
    if (!from) {
      setFrom(e);
    } else {
      if (!to) {
        setTo(e);
      } else {
        setTo(0);
        setFrom(e);
      }
    }
  };

  //Функция преобразовывает число из формата timestamp в ДД.ММ.ГГ
  const getDateString = useCallback((date: Date, format: string) => {
    if (!date) return "";
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();

    return format === "-"
      ? `${year}-${month}-${day}`
      : `${day}.${month}.${year}`;
  }, []);
  //Функция возвращает диапазон дат ввиде строки
  const selectedRange = useMemo(() => {
    if (from && to) {
      const selectedFromDate = new Date(from);
      const selectedToDate = new Date(to);
      if (from > to) {
        setStartDate(getDateString(selectedToDate, ""));
        setEndDate(getDateString(selectedFromDate, ""));
        setOpenCalendar(false);
        setDateText(
          `${getDateString(selectedToDate, "")}-${getDateString(
            selectedFromDate,
            ""
          )}`
        );
      } else {
        setStartDate(getDateString(selectedFromDate, ""));
        setEndDate(getDateString(selectedToDate, ""));
        setOpenCalendar(false);
        setDateText(
          `${getDateString(selectedFromDate, "")}-${getDateString(
            selectedToDate,
            ""
          )}`
        );
      }
    }
  }, [from, to]);
  //Функция закрепления рефа за елементом
  const handleUnique = useCallback(
    <T,>(elem: T, state: Dispatch<SetStateAction<T | null>>) => {
      state(elem);
    },
    []
  );

  //Функция открытия/закрытия попофера по клику на иконку
  const openPopoverUnique = useCallback(
    (state: Dispatch<SetStateAction<boolean>>, task = false) => {
      if (isTemplate && task) {
        setEditMode(true);
      }
      if (task) {
        state((isOpen) => !isOpen);
        window.scrollTo({
          top: 198,
          behavior: "smooth",
        });
      } else {
        state((isOpen) => !isOpen);
      }
    },
    []
  );

  //Функция для проверки какой радиобокс выбран
  const onChange = (
    _: React.ChangeEvent<Element> | React.MouseEvent<Element, MouseEvent>,
    payload: { value: string }
  ) => {
    let status = "";
    if (payload.value === "In progress") {
      setValueStatus(StatusList.InProgress);
      status = StatusList.InProgress;
    } else {
      setValueStatus(StatusList.Done);
      status = StatusList.Done;
    }
    dispatch(
      patchTaskByEmployee({
        status: status,
        iprId: id!,
        taskId: uniqueId,
      })
    );
    setOpenStatus(false);
  };

  const handleEdit = () => {
    setEditMode(true);
    setOpenEdit(false);
    setOpenTask(true);
  };

  const handleSave = () => {
    setOpenConfirmModal(true);
  };

  const handleDeleteButton = () => {
    setEditMode(false);
    dispatch(setTemplateElement(null));
    dispatch(setTemplate(false));
  };

  return (
    <>
      <div
        className={`${styles.taskLine} ${classNameLine}`}
        ref={(e: HTMLDivElement) =>
          handleUnique<HTMLDivElement>(e, setElementTask)
        }
      >
        <div id={uniqueId + "taskButton"} className={styles.taskName}>
          <a
            onClick={() =>
              isTemplate && editMode
                ? handleSave()
                : editMode
                ? handleSave()
                : openPopoverUnique(setOpenTask, true)
            }
            href={"#" + uniqueId + "taskPopover"}
            className={styles.anchor}
          >
            <ChevronDownMIcon className={styles.taskButton} />
            <p className={styles.taskText}>{taskText}</p>
          </a>
        </div>
        <div
          id={uniqueId + "calendarButton"}
          className={
            isSupervisor && editMode ? styles.taskDate : styles.taskDateOff
          }
          onClick={
            isSupervisor && editMode
              ? () => openPopoverUnique(setOpenCalendar)
              : undefined
          }
          ref={(e: HTMLDivElement) =>
            handleUnique<HTMLDivElement>(e, setElementCalendar)
          }
        >
          <CalendarMIcon
            className={
              dateText !== "Укажите диапазон дат" ? styles.black : styles.grey
            }
          />
          <p
            className={
              dateText !== "Укажите диапазон дат"
                ? styles.textDate
                : styles.textDateGrey
            }
          >
            {dateText}
          </p>
        </div>
        <Popover
          open={isOpenCalendar}
          anchorElement={elemCalendar}
          position="bottom"
          preventFlip={true}
          zIndex={41}
          offset={[-70, 2]}
        >
          {" "}
          <div id={uniqueId + "calendarPopover"}>
            <Calendar
              open={true}
              showCurrentYearSelector={true}
              selectedFrom={from}
              selectedTo={to}
              selectorView="month-only"
              onChange={handlerCalendar}
              rangeComplete={true}
            />
          </div>
        </Popover>
        <div className={styles.taskStatus}>
          <p
            className={
              valueStatus === StatusList.Done
                ? styles.textStatusGreen
                : valueStatus === StatusList.Canceled
                ? styles.textStatusRed
                : valueStatus === StatusList.NoStatus
                ? styles.textStatusGrey
                : styles.textStatus
            }
            ref={(e: HTMLParagraphElement) =>
              handleUnique<HTMLParagraphElement>(e, setElementStatus)
            }
          >
            {translateStatus(valueStatus as StatusList, "en-ru")}
          </p>
        </div>
        <div className={styles.taskIcon}>
          {isSupervisor ? (
            <IconButton
              view="primary"
              size={24}
              icon={DotsThreeVerticalMIcon}
              ref={(e: HTMLButtonElement) =>
                handleUnique<HTMLButtonElement>(e, setElementEdit)
              }
              onClick={() => openPopoverUnique(setOpenEdit)}
              id={uniqueId + "editButton"}
            />
          ) : (
            <IconButton
              icon={ChevronDownMIcon}
              view="primary"
              size={24}
              id={uniqueId + "statusButton"}
              onClick={() => openPopoverUnique(setOpenStatus)}
              className={styles.downArrow}
            />
          )}
        </div>
        <Popover
          open={isOpenEdit}
          anchorElement={elemEdit}
          position="bottom"
          preventFlip={true}
          zIndex={41}
          popperClassName={styles.popoverEdit}
          offset={[-74, 2]}
        >
          <ul id={uniqueId + "editPopover"} className={styles.popoverList}>
            <li className={styles.popoverItem} onClick={handleEdit}>
              <a
                href={"#" + uniqueId + "taskPopover"}
                className={styles.blackText}
              >
                Редактировать
              </a>
            </li>
            <li
              className={styles.popoverItem}
              onClick={() =>
                isTemplate
                  ? handleDeleteButton()
                  : dispatch(deleteTask({ iprId: id!, taskId: uniqueId }))
              }
            >
              Удалить
            </li>
          </ul>
        </Popover>
        <Popover
          open={isOpenStatus}
          anchorElement={elemStatus}
          position="bottom"
          preventFlip={true}
          zIndex={41}
          popperClassName={styles.radioGroup}
          offset={[20, 14]}
        >
          <div id={uniqueId + "statusPopover"}>
            <RadioGroup
              className={styles.radioContainer}
              value={valueStatus}
              onChange={onChange}
            >
              <Radio
                size="m"
                label={
                  <p className={styles.radioText}>{StatusListRU.InProgress}</p>
                }
                block={true}
                value={StatusList.InProgress}
                checked={valueStatus === StatusList.InProgress}
                circleClassName={styles.greyBg}
              />
              <Radio
                size="m"
                label={
                  <p className={styles.radioTextGreen}>{StatusListRU.Done}</p>
                }
                block={true}
                value={StatusList.Done}
                checked={valueStatus === StatusList.Done}
                contentClassName={styles.radioTextGreen}
              />
            </RadioGroup>
          </div>
        </Popover>
      </div>
      <Popover
        open={isOpenTask}
        anchorElement={elemTask}
        useAnchorWidth={true}
        position="bottom"
        zIndex={10}
        preventFlip={true}
        transition={{ timeout: 500 }}
      >
        <div id={uniqueId + "taskPopover"} className={styles.popoverTask}>
          <TaskForm
            setDateText={setDateText}
            date={{ startDate, endDate }}
            // date={dates}
            uniqueId={uniqueId}
            textValue={taskText}
            descriptionValue={descriptionText}
            editMode={editMode}
            dateText={dateText}
            setTask={setOpenTask}
            setEditMode={setEditMode}
            setOpenConfirmModal={setOpenConfirmModal}
            statusTask={valueStatus as StatusList}
            openConfirmModal={openConfirmModal}
          />
          <Сomments uniqueId={uniqueId} />
        </div>
      </Popover>
    </>
  );
};

export default TaskLine;
