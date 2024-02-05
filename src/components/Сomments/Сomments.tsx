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
import {
  SuperiorInfo,
  getSubordinatesFromStore,
  getUserFromState,
  getUserRole,
  getUserSimplified,
} from "../../services/selectors/authSelector";
import { useDispatch, useSelector } from "../../services/hooks";
import { Textarea } from "@alfalab/core-components/textarea";
import { Modal } from "@alfalab/core-components/modal";
import { isTemplate } from "../../services/selectors/taskSelector";
import {
  getCommentsContainer,
  getCommentsSuccess,
  getSendCommentSuccess,
} from "../../services/selectors/commentsSelector";
import {
  getComments,
  postComment,
} from "../../services/middlewares/commentsQueries";
import { TComment } from "../../utils/api/types";
import {
  getSubordinates,
  getUserById,
} from "../../services/middlewares/authQueries";

type TProps = {
  uniqueId: string | number;
  // comms: TComment[] | null;
};

const Сomments: FC<TProps> = ({ uniqueId }) => {
  const [ulElement, setUlElement] = useState<HTMLUListElement>();
  const [ulHeight, setUlHeight] = useState<number>(40);
  const [value, setValue] = useState<string>("");
  const user = useSelector(getUserSimplified);
  const template = useSelector(isTemplate);
  const comments = useSelector(getCommentsContainer);
  const commentsReady = useSelector(getCommentsSuccess);
  const sendComment = useSelector(getSendCommentSuccess);
  const infoSuperior = useSelector(SuperiorInfo);
  const isSuperior = useSelector(getUserRole);
  // const userInfo = useSelector(getUserFromState)
  const dispatch = useDispatch();
  const subordinates = useSelector(getSubordinatesFromStore);


  useEffect(() => {
    dispatch(getComments(uniqueId));
    dispatch(getUserById(1));
    dispatch(getSubordinates());
  }, []);

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
    dispatch(postComment({ body: { text: value }, taskId: uniqueId }));
    if (sendComment) {
      setTimeout(() => dispatch(getComments(uniqueId)), 300);
      setTimeout(() => {
        setValue("");
        handelScroll();
      }, 400);
    }
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
    setValue(value);
  };

  const handleUlElement = (e: HTMLUListElement) => {
    setUlHeight(e?.clientHeight);
    setUlElement(e);
  };

  return (
    <div className={styles.commentsContainer}>
      <p className={styles.text}>Комментарии:</p>
      <ul
        ref={handleUlElement}
        className={`custom-scroll ${
          ulHeight >= 600 ? styles.commentsScroll : styles.comments
        }`}
      >
        {commentsReady &&
          comments?.map((item, index) => {
            if (item.author === infoSuperior?.username) {
              return <Comment key={index} comment={item} infoSuperior={infoSuperior}/>;
            } else {
              const subInfo = subordinates?.find((el) => el.username === item.author)
              return (
                <Comment
                  key={index}
                  comment={item}
                  infoSuperior={infoSuperior}
                  subInfo={subInfo}
                />
              );
            }
          })}
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
          disabled={template}
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
