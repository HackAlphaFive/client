import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Сomments.module.css";
import { Input } from "@alfalab/core-components/input";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import iconSubmit from "../../images/comments-button.svg";
import iconSubmitDisabled from "../../images/comments-button-disabled.svg";
import avatar from "../../images/Avatar.png";
import Comment from "../Comment/Comment";
import { getUserSimplified } from "../../services/selectors/authSelector";
import { useSelector } from "../../services/hooks";
import { Textarea } from "@alfalab/core-components/textarea";
import { Modal } from "@alfalab/core-components/modal";

const Сomments: FC = () => {
  const [ulElement, setUlElement] = useState<HTMLUListElement>();
  const [ulHeight, setUlHeight] = useState<number>(40);
  const [value, setValue] = useState<string>("");
  const [comm, setComment] = useState<
    Array<{
      id: number;
      name: string;
      avatar: string;
      text: string;
      date: Date;
    }>
  >([]);
  const user = useSelector(getUserSimplified);
  const commentDate = new Date();

  useEffect(() => {
    document.addEventListener("keypress", sendOnEnter);

    return () => document.removeEventListener("keypress", sendOnEnter);
  });

  const sendOnEnter = (e: KeyboardEvent) => {
    if (e.code === "Enter" && !e.shiftKey && (value?.length as number) > 0) {
      e.preventDefault();
      handleInput();
    }
  };
  //Обработчик инпута ввода, который по клику на кнопку отправить, создает комментарий и помещает его в массив, после очищает инпут
  const handleInput = () => {
    const comment = {
      id: user.id!,
      name: user.fullname,
      avatar: user?.photo!,
      text: value,
      date: commentDate,
    };
    const arr = [...comm];
    arr.push(comment);
    setComment(arr);
    setValue("");
    handelScroll();
  };
  const handelScroll = () => {
    setTimeout(
      () =>
        ulElement?.scrollTo({
          top: ulElement?.scrollHeight,
          behavior: "smooth",
        }),
      10
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log(value);
    setValue(value);
  };

  const handleUlElement = (e: HTMLUListElement) => {
    setUlHeight(e?.clientHeight);
    setUlElement(e);
  };

  //Функция переворачивает очередность массива и перебирает его, создавая элементы комментарий
  const createComments = useMemo(() => {
    return comm
      .reverse()
      .map((item, index) => <Comment key={index} comment={item} />);
  }, [comm]);

  return (
    <div className={styles.commentsContainer}>
      <p className={styles.text}>Комментарии:</p>
      <ul
        ref={handleUlElement}
        className={`custom-scroll ${
          ulHeight >= 600 ? styles.commentsScroll : styles.comments
        }`}
      >
        {createComments}
      </ul>
      <div className={styles.bottom}>
        <Circle imageUrl={user.photo} size={32} />
        <Textarea
          size="s"
          name="comment"
          onChange={(e) => handleChange(e)}
          value={value}
          maxRows={4}
          placeholder="Введите комментарий"
          textareaClassName={styles.field}
          autoComplete="off"
        />
        <button
          className={styles.sendButton}
          type="button"
          onClick={handleInput}
          disabled={value?.length === 0}
        >
          <img
            className={styles.sendIcon}
            src={value?.length === 0 ? iconSubmitDisabled : iconSubmit}
            alt="Иконка отправки комментария"
          />
        </button>
      </div>
    </div>
  );
};

export default Сomments;
