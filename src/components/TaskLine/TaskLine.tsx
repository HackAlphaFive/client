import React, { FC, useState } from "react";
import styles from "./TaskLine.module.css";
import { ChevronDownMIcon } from "@alfalab/icons-glyph/ChevronDownMIcon";
import { CalendarMIcon } from "@alfalab/icons-glyph/CalendarMIcon";
import { DotsThreeVerticalMIcon } from "@alfalab/icons-glyph/DotsThreeVerticalMIcon";
import { Popover } from "@alfalab/core-components/popover";
import { IconButton } from "@alfalab/core-components/icon-button";
import { Calendar } from "@alfalab/core-components/calendar";

type TProps = {
  taskText: string;
  date?: string;
  status: string;
};

const TaskLine: FC<TProps> = ({ taskText, date, status }) => {
  const [isOpenPopoverEdit, setisOpenPopoverEdit] = useState(false);
  const [elemPopoverEdit, setElementPopoverEdit] =
    useState<null | HTMLButtonElement>(null);
  const [isOpenPopoverCalendar, setIsOpenPopoverCalendar] = useState(false);
  const [elemPopoverCalendar, setElementPopoverCalendar] =
    useState<null | HTMLDivElement>(null);
  // const [value, setValue] = useState<number>();
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();

  //Функция обработчик диапазона дат
  const handlerCalendar = (e: number | undefined) => {
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
  const getDateString = React.useCallback((date: Date) => {
    if (!date) return "";
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }, []);

  //Функция возвращает диапазон дат ввиде строки
  const selectedRange = React.useMemo(() => {
    if (from && to) {
      const selectedFromDate = new Date(from);
      const selectedToDate = new Date(to);
      return `${getDateString(selectedFromDate)} - ${getDateString(
        selectedToDate
      )}`;
    }
  }, [from, to]);
  //Функция открывает поповер
  const openPopoverCalendar = () => {
    setIsOpenPopoverCalendar((isOpen) => !isOpen);
  };
  //Функция определяет, к какому елементу закрепляется поповер
  const handleCalendarRef = (node: HTMLDivElement) => {
    setElementPopoverCalendar(node);
  };
  //Функция открывает поповер
  const openPopoverEdit = () => {
    setisOpenPopoverEdit((isOpen) => !isOpen);
  };
  //Функция определяет, к какому елементу закрепляется поповер
  const handleEditRef = (node: HTMLButtonElement) => {
    setElementPopoverEdit(node);
  };
  return (
    <div className={styles.taskLine}>
      <div className={styles.taskName}>
        <ChevronDownMIcon />
        <p className={styles.taskText}>{taskText}</p>
      </div>
      <div
        className={styles.taskDate}
        onClick={openPopoverCalendar}
        ref={handleCalendarRef}
      >
        <CalendarMIcon className={(date) ? styles.textDate : styles.grey}/>
        <p className={(date) ? styles.textDate : styles.grey}>{(from && to) ? selectedRange : date ? date : 'Укажите диапазон дат'}</p>
      </div>
      <Popover
        open={isOpenPopoverCalendar}
        anchorElement={elemPopoverCalendar}
        position="bottom"
        preventFlip={true}
        zIndex={40}
        popperClassName={styles.calendar}
        offset={[-70, 2]}
      >
        <Calendar
          open={true}
          showCurrentYearSelector={true}
          selectedFrom={from}
          selectedTo={to}
          selectorView="month-only"
          onChange={handlerCalendar}
          rangeComplete={true}
        />
      </Popover>
      <div className={styles.taskStatus}>
        <p className={styles.textStatus}>{status}</p>
        <IconButton
          className={styles.alertButton}
          view="primary"
          size={24}
          icon={DotsThreeVerticalMIcon}
          ref={handleEditRef}
          onClick={openPopoverEdit}
        />
      </div>
      <Popover
        open={isOpenPopoverEdit}
        anchorElement={elemPopoverEdit}
        position="bottom"
        preventFlip={true}
        zIndex={40}
        popperClassName={styles.popover}
        offset={[-70, 2]}
      >
        <ul className={styles.popoverList}>
          <li className={styles.popoverItem}>Редактировать</li>
          <li className={styles.popoverItem}>Удалить</li>
        </ul>
      </Popover>
    </div>
  );
};

export default TaskLine;
