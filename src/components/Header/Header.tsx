import React, { FC } from "react";

import styles from "./Header.module.css";
import logo from "../../images/LogoAP.png";
import searchIcon from "../../images/Search-icon.svg";
import { Link } from "@alfalab/core-components/link";
import { Input } from "@alfalab/core-components/input";
import { IconButton } from "@alfalab/core-components/icon-button";
import { BellMIcon } from "@alfalab/icons-glyph/BellMIcon";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link underline={false} href="https://alfabank.ru/"><img src={logo} alt="Logo Alfa People" className={styles.logo} /></Link>
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
        <div className={styles.avatar}></div>
      </div>
    </header>
  );
};

export default Header;
