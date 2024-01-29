import React, { FC, useMemo, useState } from "react";
import styles from "./Сomments.module.css";
import { Input } from "@alfalab/core-components/input";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import iconSubmit from "../../images/comments-button.svg";
import avatar from "../../images/Avatar.png";
import Comment from "../Comment/Comment";

const Сomments: FC = () => {
  const commentData = {
    name: "Максим Благин",
    avatar: avatar,
    date: "2 недели назад"
  };

  const [value, setValue] = useState<string>();
  const [comm, setComment] = useState<
    Array<{
      name: string;
      avatar: any;
      text: string;
      date: string;
    }>
  >([]);

  //Обработчик инпута ввода, который по клику на кнопку отправить, создает комментарий и помещает его в массив, после очищает инпут
  const handleInput = () => {
    const inputComment = document.getElementById("comment") as HTMLInputElement;
    const comment = {
      name: commentData.name,
      avatar: commentData.avatar,
      text: inputComment.value,
      date: commentData.date
    };
    const arr = [...comm];
    arr.push(comment)
    inputComment.value = "";
    setComment(arr);
    setValue('')
  };

  //Функция переворачивает очередность массива и перебирает его, создавая элементы комментарий
  const createComments = useMemo(() => {
   return comm.reverse().map((item) => (<Comment comment={item} />))
  },[comm])
  console.log(comm)

  return (
    <div className={styles.commentsContainer}>
      <p className={styles.text}>Комментарии:</p>
      <ul className={styles.comments}>{createComments}</ul>
      <div className={styles.bottom}>
        <Circle imageUrl={commentData.avatar} size={32} />
        <Input
          type="text"
          size="m"
          label="Введите комментарий"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fieldClassName={styles.field}
          inputClassName={styles.input}
          labelClassName={styles.label}
          min={10}
          max={250}
          id="comment"
        />
        <button
          className={styles.sendButton}
          type="button"
          onClick={handleInput}
        >
          <img
            className={styles.sendIcon}
            src={iconSubmit}
            alt="Иконка отправки сообщения"
          />
        </button>
      </div>
    </div>
  );
};

export default Сomments;
