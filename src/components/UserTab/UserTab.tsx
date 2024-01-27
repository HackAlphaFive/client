import React from 'react';
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { PureCell } from "@alfalab/core-components/pure-cell";

import avatar from "../../images/Avatar.png";
import styles from './UserTab.module.css';

type Props = {}

const UserTab = (props: Props) => {
  return (
    <PureCell>
      <PureCell.Graphics verticalAlign='center'>
        <Circle imageUrl={avatar} size={64}/>
      </PureCell.Graphics>
      <PureCell.Main className={styles.userTabContainer}>
        <p className={styles.userTabTitle}>Имя Фамилия</p>
        <p className={styles.userTabText}>Должность</p>
      </PureCell.Main>
    </PureCell>
    )
  }

export default UserTab
