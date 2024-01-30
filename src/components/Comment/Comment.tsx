import React, { FC } from "react";
import styles from "./Comment.module.css";
import { Circle } from "@alfalab/core-components/icon-view/circle";
type TProps = {
  comment: { name: string; avatar: string; text: string; date: string };
};

const Comment: FC<TProps> = ({ comment }) => {
  return (
    <li className={styles.comment}>
      <div className={styles.top}>
        <Circle imageUrl={comment.avatar} size={32} />
        <p className={styles.name}>{comment.name}</p>
        <p className={styles.date}>{comment.date}</p>
      </div>
      <p className={styles.text}>{comment.text}</p>
    </li>
  );
};

export default Comment;
