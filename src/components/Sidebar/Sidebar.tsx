import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Link } from '@alfalab/core-components/link';
import { NoShape } from '@alfalab/core-components/icon-view/no-shape';
import {ReactComponent as ArrowIcon} from '../../assets/sidebar-icons/Arrow.svg';

export type SidebarItem = {
  href: string;
  text: string;
  target?: string;
  icon?: string;
};

export type SidebarProps = {
  items: SidebarItem[];
};

const Sidebar = ({ items }: SidebarProps) => {
  const location = useLocation();

  const renderSidebarItems = () => {
    if (location.pathname === '/') {
      //Если на Главной
      return items.map((item, index) => (
        <li key={index} className={styles.sidebarItem}>
          <Link
            view='primary'
            Component={RouterLink}
            href={item.href}
            underline={false}
            leftAddons={<NoShape imageUrl={item.icon} size={40}/>}
            className={styles.sidebarLink}
          >
            {item.text}
          </Link>
        </li>
      ));
    } else if (location.pathname === '/ipr') {
      //Если на странице ИПР
      return (
        <li className={styles.sidebarItem}>
          <Link
            view='primary'
            Component={RouterLink}
            href='/'
            underline={false}
            leftAddons={<ArrowIcon/>}
            className={`${styles.sidebarLink} ${styles.sidebarLinkBack}`}
          >
            Сервисы
          </Link>
        </li>
      );
    }
    return null;
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.sidebarList}>
          {renderSidebarItems()}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
