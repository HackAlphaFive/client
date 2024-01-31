import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Сomments.module.css";
import { Input } from "@alfalab/core-components/input";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import iconSubmit from "../../images/comments-button.svg";
import iconSubmitDisabled from '../../images/comments-button-disabled.svg'
import avatar from "../../images/Avatar.png";
import Comment from "../Comment/Comment";

const Сomments: FC = () => {
  const commentData = {
    name: "Максим Благин",
    avatar: avatar,
    date: "2 недели назад",
  };
const [ulHeight, setUlHeight] = useState<number>(10)
  const [value, setValue] = useState<string>("");
  const [comm, setComment] = useState<
    Array<{
      name: string;
      avatar: any;
      text: string;
      date: string;
    }>
  >([]);
  useEffect(() => {
    document.addEventListener("keypress", sendOnEnter);

    return () => document.removeEventListener("keypress", sendOnEnter);
  });

  // useEffect(() => {
  //   const height = refComponent.current.getBoundingClientRect().height;

  //   console.log(height, "height");
  // }, [refComponent]);
  console.log(ulHeight)
  const sendOnEnter = (e: KeyboardEvent) => {
    if (e.code === "Enter" && (value?.length as number) > 0) {
      handleInput();
    }
  };
  //Обработчик инпута ввода, который по клику на кнопку отправить, создает комментарий и помещает его в массив, после очищает инпут
  const handleInput = () => {
    const inputComment = document.getElementById("comment") as HTMLInputElement;
    const comment = {
      name: commentData.name,
      avatar: commentData.avatar,
      text: inputComment.value,
      date: commentData.date,
    };
    const arr = [...comm];
    arr.push(comment);
    setComment(arr);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleUlElement = (e:HTMLUListElement) => {
    setUlHeight(e?.clientHeight)
  }

  //Функция переворачивает очередность массива и перебирает его, создавая элементы комментарий
  const createComments = useMemo(() => {
    return comm
      .reverse()
      .map((item, index) => <Comment key={index} comment={item} />);
  }, [comm]);

  return (
    <div className={styles.commentsContainer}>
      <p className={styles.text}>Комментарии:</p>
      <ul ref={handleUlElement} className={`custom-scroll ${ulHeight >= 600 ? styles.commentsScroll : styles.comments}`} >{createComments}</ul>
      <div className={styles.bottom}>
        <Circle imageUrl={commentData.avatar} size={32} />
        <Input
          type="text"
          size="m"
          label="Введите комментарий"
          value={value}
          onChange={handleChange}
          fieldClassName={styles.field}
          inputClassName={styles.input}
          labelClassName={styles.label}
          id="comment"
        />
        <button
          className={styles.sendButton}
          type="button"
          onClick={handleInput}
          disabled={value?.length === 0}
        >
          <img className={styles.sendIcon} src={value?.length === 0 ? iconSubmitDisabled : iconSubmit} alt="Иконка отправки комментария" />
        </button>
      </div>
    </div>
  );
};

export default Сomments;
