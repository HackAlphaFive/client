import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar, { SidebarItem } from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

import homeIcon from '../../assets/sidebar-icons/home.png';
import iprIcon from '../../assets/sidebar-icons/ipr.png';

import styles from './Layout.module.css';

const sidebarItems: SidebarItem[] = [
  {
    href: '/',
    text: 'Главная',
    icon: homeIcon,
  },
  {
    href: '/ipr',
    text: 'Страница ИПР',
    icon: iprIcon
  },
];

const footerItems: SidebarItem[] = [
  {
    href: '#',
    text: 'Подвальчик',
  },
  {
    href: '#',
    text: 'Все о работе',
  },
  {
    href: '#',
    text: 'Подразделения',
  },
  {
    href: '#',
    text: 'Связь',
  },
  {
    href: '#',
    text: 'Подразделения',
  },
  {
    href: '#',
    text: 'Подразделения',
  },
];

function Layout() {
  return (
      <div className={styles.layout}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.sidebar}>
          <Sidebar items={sidebarItems} />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
        <div className={styles.footer}>
          <Footer items={footerItems}/>
        </div>
      </div>
  );
}

export default Layout;
