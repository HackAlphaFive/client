import React, { FC, useState } from "react";
import styles from "./TaskForm.module.css";
import { Input } from "@alfalab/core-components/input";
import { Textarea } from "@alfalab/core-components/textarea";
import { Button } from "@alfalab/core-components/button";
import { PlusMediumMIcon } from "@alfalab/icons-glyph/PlusMediumMIcon";
type TProps = {
  editMode: boolean;
  jobtitle: string;
  startDate: string;
  endDate: string;
  status: string
  setEditMode:React.Dispatch<React.SetStateAction<boolean>>
};
const TaskForm: FC<TProps> = ({ editMode, jobtitle, startDate, endDate, status, setEditMode }) => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    state: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    state(value);
  };

const handleSaveButton  = () => {
  const task = {
    title: inputValue,
    description: textareaValue,
    status: status,
    start_date: startDate,
    end_date: endDate,
  }
  setEditMode(false)
}
const handleCancelButton = () => {
  setEditMode(false)
}

  return (
    <div className={styles.taskForm} >
      <Input
        name="taskName"
        onChange={(e) => handleChange(e, setInputValue)}
        placeholder="Введите текст"
        block={true}
        hint="Введите название задачи"
        error={inputValue.length < 5 ? "Название задачи должно быть не короче 2 симв." : false}
        value={inputValue}
        disabled={jobtitle === "director" ? !editMode : true}
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
        minRows={10}
        maxHeight={248}
        maxLength={480}
        showCounter={true}
        error={textareaValue.length > 480}
        value={textareaValue}
        disabled={jobtitle === "director" ? !editMode : true}
      />
      {editMode && jobtitle === "director" && (
        <div className={styles.buttons}>
          <Button
            view="tertiary"
            className={styles.taskButton}
            leftAddons={<PlusMediumMIcon />}
            // disabled={true}
            onClick={handleCancelButton}
          >
            Отмена
          </Button>
          <Button
            view="primary"
            className={styles.taskButton}
            leftAddons={<PlusMediumMIcon fill="white" />}
            disabled={inputValue.length > 5 && textareaValue.length <= 480 ? false : true}
            onClick={inputValue.length > 5 && textareaValue.length <= 480 ? handleSaveButton : undefined}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
