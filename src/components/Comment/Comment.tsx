import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./Comment.module.css";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import {
  getSubordSuccess,
  getSubordinatesFromStore,
  getUserName,
  getUserRole,
  getUserSimplified,
} from "../../services/selectors/authSelector";
import { useDispatch, useSelector } from "../../services/hooks";
import FormattingDate from "../FormattingDate/FormattingDate";
import { TResponseGetSomeUser, TUser } from "../../utils/api/types";

type TProps = {
  comment: {
    id: number;
    created_date: string;
    author: string;
    task: number;
    text: string;
  };
  infoSuperior?: TResponseGetSomeUser | null;
  subInfo?: Omit<TUser, "isSuperior"> | undefined;
};

const Comment: FC<TProps> = ({ comment, infoSuperior, subInfo }) => {
  const user = useSelector(getUserSimplified);
  const date = new Date(comment.created_date);
  const isSuperior = useSelector(getUserRole);
  const userName = useSelector(getUserName);

  return isSuperior ? (
    <li className={styles.comment}>
      <div className={styles.top}>
        <Circle
          imageUrl={
             userName === comment.author ? infoSuperior?.photo : subInfo?.photo
          }
          size={32}
        />
        <p
          className={
            userName === comment.author ? styles.boldName : styles.name
          }
        >
          {userName === comment.author
            ? `${infoSuperior?.last_name} ${infoSuperior?.first_name} ${infoSuperior?.patronymic}`
            : `${subInfo?.last_name} ${subInfo?.first_name} ${subInfo?.patronymic}`}
        </p>
        <FormattingDate date={date} className={styles.date} />
      </div>
      <p className={styles.text}>{comment.text}</p>
    </li>
  ) : (
    <li className={styles.comment}>
      <div className={styles.top}>
        <Circle
          imageUrl={
            infoSuperior && userName === comment.author
              ? user.photo
              : infoSuperior?.photo
          }
          size={32}
        />
        <p
          className={
            userName === comment.author ? styles.boldName : styles.name
          }
        >
          {infoSuperior && userName === comment.author
            ? user.fullname
            : `${infoSuperior?.last_name} ${infoSuperior?.first_name} ${infoSuperior?.patronymic}`}
        </p>
        <FormattingDate date={date} className={styles.date} />
      </div>
      <p className={styles.text}>{comment.text}</p>
    </li>
  );
};

export default Comment;
