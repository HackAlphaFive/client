import React, { FC, useEffect, useRef, useState } from "react";

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

const Header: FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const [elem, setElement] = useState<null | HTMLDivElement>(null);

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
            anchor={elem}
            offset={[2, -12]}
            zIndex={51}
            onOpenDelay={0}
            content={
              <div className={styles.tooltip}>Выберите пользователя.</div>
            }
          >
            <Circle className={styles.avatar} imageUrl={avatar} size={40} />
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
            <li className={styles.popoverItem}>
              <PureCell.Content>
                <PureCell.Addon addonPadding="none" verticalAlign="center">
                  <Circle imageUrl={avatar} size={40} />
                </PureCell.Addon>
                <PureCell.Main className={styles.popoverMain}>
                  <p className={styles.popoverHeader}>
                    Коломиец Ксения Валерьевна
                  </p>
                  <p className={styles.popoverText}>
                    Ведущий специалист по тестированию
                  </p>
                </PureCell.Main>
              </PureCell.Content>
            </li>
            <li className={styles.popoverItem}>
              <PureCell.Content>
                <PureCell.Addon addonPadding="none" verticalAlign="center">
                  <Circle imageUrl={avatar} size={40} />
                </PureCell.Addon>
                <PureCell.Main className={styles.popoverMain}>
                  <p className={styles.popoverHeader}>
                    Коломиец Ксения Валерьевна
                  </p>
                  <p className={styles.popoverText}>
                    Ведущий специалист по тестированию
                  </p>
                </PureCell.Main>
              </PureCell.Content>
            </li>
          </ul>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
