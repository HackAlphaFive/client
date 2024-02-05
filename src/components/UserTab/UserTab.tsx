import { FC } from 'react';
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { PureCell } from "@alfalab/core-components/pure-cell";

import styles from './UserTab.module.css';

type TProps = {
  avatar: string;
  username: string;
  position: string;
  cellExtraClassNameCell?: string;
  onClick?: () => void;
};

const UserTab: FC<TProps> = ({ avatar, username, position, cellExtraClassNameCell, onClick }) => {
  return (
    <PureCell className={`${styles.cell} ${cellExtraClassNameCell}`} onClick={onClick}>
      <PureCell.Graphics verticalAlign='center'>
        <Circle imageUrl={avatar} size={64}/>
      </PureCell.Graphics>
      <PureCell.Main className={`${styles.textContainer}`}>
        <p className={`text text_color_main text_type_middle text_ellipsis ${styles.text}`}>{username}</p>
        <p className={`text text_color_tooltip text_type_small text_ellipsis ${styles.text}`}>{position}</p>
      </PureCell.Main>
    </PureCell>
    )
  }

export default UserTab;
