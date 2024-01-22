import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar, { SidebarItem } from '../Sidebar/Sidebar';

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

function Layout() {
  return (
      <div className={styles.layout}>
        <header className={styles.header}>
          <Header />
        </header>
        <aside className={styles.sidebar}>
          <Sidebar items={sidebarItems} />
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
  );
}

export default Layout;
