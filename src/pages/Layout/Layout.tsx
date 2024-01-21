import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar, { SidebarItem } from '../../components/Sidebar/Sidebar';

import styles from './Layout.module.css';

const sidebarItems: SidebarItem[] = [
  { href: '/', text: 'Главная' },
  { href: '/ipr', text: 'Страница ИПР' }
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
