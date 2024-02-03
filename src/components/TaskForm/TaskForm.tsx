import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./TaskForm.module.css";
import { Input } from "@alfalab/core-components/input";
import { Textarea } from "@alfalab/core-components/textarea";
import { Button } from "@alfalab/core-components/button";
import { PlusMediumMIcon } from "@alfalab/icons-glyph/PlusMediumMIcon";
import { getUserRole } from "../../services/selectors/authSelector";
import { useDispatch, useSelector } from "../../services/hooks";
import SuccessfulModal from "../SuccessfulModal/SuccessfulModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { isTemplate } from "../../services/selectors/taskSelector";
import {
  setTemplate,
  setTemplateElement,
} from "../../services/slices/taskSlice";

type TProps = {
  statusTask: string;
  setDateText: React.Dispatch<React.SetStateAction<string>>;
  dateText: string;
  textValue: string;
  descriptionValue: string;
  editMode: boolean;
  date: {
    prevDate: {
      start: string | undefined;
      end: string | undefined;
    };
    newDate: {
      start: string;
      end: string;
    };
  };
  openConfirmModal: boolean;
  setTask: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const TaskForm: FC<TProps> = ({
  statusTask,
  textValue,
  descriptionValue,
  editMode,
  dateText,
  date,
  openConfirmModal,
  setDateText,
  setTask,
  setEditMode,
  setOpenConfirmModal,
}) => {
  const [inputValue, setInputValue] = useState(textValue);
  const [textareaValue, setTextareaValue] = useState<string>(descriptionValue);
  const [openModalStatus, SetOpenModalStatus] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const isSupervisor = useSelector(getUserRole);
  const [values, setValues] = useState({
    prevValues: {
      text: textValue,
      description: descriptionValue,
      date: `${date.prevDate.start}-${date.prevDate.end}`,
    },
    newValues: {
      text: inputValue,
      description: textareaValue,
      date: dateText,
    },
  });
  const dispatch = useDispatch();
  const template = useSelector(isTemplate);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    state: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    state(value);
  };

  //Функция обрабатывает новые переменные в инпутах
  const handleForm = useMemo(() => {
    setValues({
      ...values,
      newValues: {
        text: inputValue,
        description: textareaValue,
        date: dateText,
      },
    });
  }, [inputValue, textareaValue, date]);

  //Функция обработчик изменений в  инпутах в задачи
  const changeInForm = useMemo(() => {
    if (
      values.prevValues.text !== values.newValues.text ||
      values.prevValues.description !== values.newValues.description ||
      values.prevValues.date !== values.newValues.date
    ) {
      return true;
    } else if (
      values.prevValues.text === values.newValues.text &&
      values.prevValues.description === values.newValues.description &&
      values.prevValues.date === values.newValues.date
    ) {
      return false;
    }
  }, [values]);

  //Обработчик кнопки сохранить
  const handleSaveButton = () => {
    const task = {
      title: inputValue,
      description: textareaValue,
      status: statusTask,
      start_date:
        date.newDate.start.length === 0
          ? date.prevDate.start
          : date.newDate.start,
      end_date:
        date.newDate.end.length === 0 ? date.prevDate.end : date.newDate.end,
    };
    setValues({
      ...values,
      prevValues: { ...values.prevValues, date: dateText },
    });
    setEditMode(false);
    setFocus(false);
    SetOpenModalStatus(true);
  };
  const handleCreateTask = () => {
    const task = {
      title: inputValue,
      // ipr: iprId,
      description: textareaValue,
      start_date:
        date.newDate.start.length === 0
          ? date.prevDate.start
          : date.newDate.start,
      end_date:
        date.newDate.end.length === 0 ? date.prevDate.end : date.newDate.end,
    };
    setValues({
      ...values,
      prevValues: { ...values.prevValues, date: dateText },
    });
    setEditMode(false);
    setFocus(false);
    SetOpenModalStatus(true);
    setTimeout(() =>{dispatch(setTemplateElement(null));
    dispatch(setTemplate(false))}, 1200);
  };

  //Обработчик кнопки отменить
  const handleCancelButton = () => {
    setInputValue(textValue);
    setTextareaValue(descriptionValue);
    setEditMode(false);
    setFocus(false);
    setDateText(
      date.prevDate.start?.length === 0 && date.prevDate.end?.length === 0
        ? "Укажите диапазон дат"
        : `${date.prevDate.start}-${date.prevDate.end}`
    );
  };

  const handleDeleteButton = () => {
    dispatch(setTemplateElement(null));
    dispatch(setTemplate(false));
  };

  return (
    <>
      <div className={styles.taskForm}>
        <Input
          name="taskName"
          onClick={() => setFocus(true)}
          onChange={(e) => {
            handleChange(e, setInputValue);
          }}
          placeholder="Введите текст"
          block={true}
          hint={
            inputValue.length === 0 || isFocus ? "Введите название задачи" : ""
          }
          error={
            inputValue.length < 5
              ? "Название задачи должно быть не короче 5 симв."
              : inputValue.length > 25
              ? "Название задачи должно быть не длинее 25 симв."
              : false
          }
          value={inputValue && inputValue}
          disabled={isSupervisor ? !editMode : true}
          fieldClassName={
            inputValue.length === 0 || isFocus ? "" : styles.fieldInput
          }
        />
        <p
          className={`text_color_main text_type_middle ${styles.textDescription}`}
        >
          Описание задачи
        </p>
        <Textarea
          name="taskDescription"
          onChange={(e) => handleChange(e, setTextareaValue)}
          placeholder="Введите текст"
          textareaClassName={styles.textareaForm}
          block={true}
          minRows={1}
          maxRows={11}
          maxLength={480}
          showCounter={true}
          error={textareaValue.length > 480}
          value={textareaValue}
          disabled={isSupervisor ? !editMode : true}
        />
        {editMode && isSupervisor && (
          <div className={styles.buttons}>
            <Button
              view="tertiary"
              className={styles.taskButton}
              // disabled={true}
              onClick={template ? handleDeleteButton : handleCancelButton}
            >
              Отмена
            </Button>
            <Button
              view="primary"
              // nowrap={true}
              // textResizing='fill'
              className={styles.saveButton}
              leftAddons={<PlusMediumMIcon fill="white" />}
              disabled={
                template
                  ? !(
                      inputValue.length >= 5 &&
                      inputValue.length < 25 &&
                      textareaValue.length <= 480 &&
                      dateText !== "Укажите диапазон дат"
                    )
                  : !(
                      inputValue.length >= 5 &&
                      inputValue.length < 25 &&
                      textareaValue.length <= 480 &&
                      dateText !== "Укажите диапазон дат" &&
                      changeInForm
                    )
              }
              onClick={
                template &&
                inputValue.length >= 5 &&
                inputValue.length < 25 &&
                textareaValue.length <= 480 &&
                dateText !== "Укажите диапазон дат" &&
                changeInForm
                  ? handleCreateTask
                  : inputValue.length >= 5 &&
                    inputValue.length < 25 &&
                    textareaValue.length <= 480 &&
                    dateText !== "Укажите диапазон дат" &&
                    changeInForm
                  ? handleSaveButton
                  : undefined
              }
            >
              {template ? (
                <p className={styles.textSaveButton}>Создать задачу</p>
              ) : (
                <p className={styles.textSaveButton}>Сохранить изменения</p>
              )}
            </Button>
          </div>
        )}
      </div>
      <SuccessfulModal isOpen={openModalStatus} setOpen={SetOpenModalStatus} />
      <ConfirmModal
        formReady={
          inputValue.length >= 5 &&
          inputValue.length < 25 &&
          textareaValue.length <= 480 &&
          dateText !== "Укажите диапазон дат"
        }
        setTask={setTask}
        setEdit={setEditMode}
        setOpen={setOpenConfirmModal}
        isOpen={openConfirmModal}
        handleDelete={handleDeleteButton}
        handleCreate={handleCreateTask}
        handleCancel={handleCancelButton}
        handleSave={handleSaveButton}
      />
    </>
  );
};

export default TaskForm;
