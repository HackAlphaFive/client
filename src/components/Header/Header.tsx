import React, { FC, useEffect, useRef, useState, memo } from "react";

import styles from "./Header.module.css";
import logo from "../../images/logo.svg";
import searchIcon from "../../images/Search-icon.svg";
import avatar from "../../images/Avatar.png";
import { Link } from "@alfalab/core-components/link";
import { Input } from "@alfalab/core-components/input";
import { IconButton } from "@alfalab/core-components/icon-button";
import { BellMIcon } from "@alfalab/icons-glyph/BellMIcon";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { Popover } from "@alfalab/core-components/popover";
import { PureCell } from "@alfalab/core-components/pure-cell";
import { Tooltip } from "@alfalab/core-components/tooltip";
import { useDispatch, useSelector } from "../../services/hooks";
import { getAnotherUsersFromState, getUserFromState } from "../../services/selectors/authSelector";
import { getUniqId } from "../../utils/utils";
import { getUser, login } from "../../services/middlewares/authQueries";
import { PASSWORD } from "../../utils/constants";
import { useNavigate } from "react-router";

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('рендер шапки');
  const [isOpen, setisOpen] = useState(false);
  const [isClose, setisClose] = useState<undefined | boolean>();
  const [elem, setElement] = useState<null | HTMLDivElement>(null);
  const currentUser = useSelector(getUserFromState);
  const users = useSelector(getAnotherUsersFromState);

  useEffect(() => {
    const closePopover = (e: MouseEvent) => {
      const profileAvatar = document.getElementById(
        "profileAvatar"
      ) as HTMLElement;
      const profilePopover = document.getElementById(
        "profilePopover"
      ) as HTMLElement;
      if (
        !(
          e.composedPath().includes(profilePopover) ||
          e.composedPath().includes(profileAvatar)
        )
      ) {
        setisOpen(false);
      }
    };

    document.addEventListener("click", closePopover);

    return () => {
      document.removeEventListener("click", closePopover);
    };
  }, []);

  const closeTooltip = () => {
    setisClose(false);
  };
  //Функция открытия выпающего
  const openPopover = () => {
    setisOpen((isOpen) => !isOpen);
  };
  const handleCircleRef = (node: HTMLDivElement) => {
    setElement(node);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link underline={false} href="https://alfabank.ru/">
          <img src={logo} alt='Логотип "Альфа-Пипл"' className={styles.logo} />
        </Link>
        <Link underline={false} href="https://alfabank.ru/" view="primary">
          Контакты
        </Link>
        <Link underline={false} href="https://alfabank.ru/" view="primary">
          Всё о работе
        </Link>
        <Link underline={false} href="https://alfabank.ru/" view="primary">
          Подразделения
        </Link>
      </nav>
      <div className={styles.profile}>
        <div className={styles.searchInput}>
          <Input
            size="m"
            placeholder="Введите текст"
            block={true}
            label="Поиск"
            leftAddons={<img src={searchIcon} />}
          />
        </div>
        <IconButton
          className={styles.alertButton}
          view="primary"
          size={24}
          icon={BellMIcon}
        />
        <div id="profileAvatar" onClick={openPopover} ref={handleCircleRef}>
          <Tooltip
            position="left"
            fallbackPlacements={["bottom"]}
            trigger="hover"
            onClose={closeTooltip}
            open={isClose}
            anchor={elem}
            offset={[2, -12]}
            zIndex={51}
            onOpenDelay={0}
            content={
              <div className={styles.tooltip}>Выберите пользователя.</div>
            }
          >
            <Circle className={styles.avatar} imageUrl={currentUser?.photo} size={40} />
          </Tooltip>
        </div>
        <Popover
          open={isOpen}
          anchorElement={elem}
          position="bottom"
          preventFlip={true}
          zIndex={50}
          popperClassName={styles.popover}
          offset={[-138, 2]}
        >
          <ul id="profilePopover" className={styles.popoverList}>
            {currentUser && users.length > 0 && users.map(user => { return (
              <li
                className={`${styles.popoverItem} ${currentUser.id === user.id ? styles.popoverItemChecked : ''}`}
                key={getUniqId()}
                onClick={() => {
                 dispatch(login(user.username, PASSWORD))
                 .then(() => dispatch(getUser())); // без then начинается гонка запросов

                 setisOpen(false);
                 navigate('/');
                }}
              >
                <PureCell.Content>
                  <PureCell.Addon addonPadding="none" verticalAlign="center">
                    <Circle imageUrl={user.photo} size={40} />
                  </PureCell.Addon>
                  <PureCell.Main className={styles.popoverMain}>
                    <p className={styles.popoverHeader}>
                      {`${user.last_name} ${user.first_name} ${user.patronymic}`}
                    </p>
                    <p className={styles.popoverText}>{user.position}</p>
                  </PureCell.Main>
                </PureCell.Content>
              </li>
            )})}
          </ul>
        </Popover>
      </div>
    </header>
  );
};

export default memo(Header);
