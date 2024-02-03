import React, { FC } from "react";
import styles from "./Comment.module.css";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { getUserSimplified } from "../../services/selectors/authSelector";
import { useSelector } from "../../services/hooks";
import FormattingDate from "../FormattingDate/FormattingDate";
type TProps = {
  comment: { id:number; name: string; avatar: string; text: string; date: Date };
};

const Comment: FC<TProps> = ({ comment }) => {
  const user = useSelector(getUserSimplified);

  return (
    <li className={styles.comment}>
      <div className={styles.top}>
        <Circle imageUrl={comment.avatar} size={32} />
        <p className={user.id === comment.id ? styles.boldName : styles.name}>{comment.name}</p>
        <FormattingDate date={comment.date} className={styles.date}/>
      </div>
      <p className={styles.text}>{comment.text}</p>
    </li>
  );
};

export default Comment;
