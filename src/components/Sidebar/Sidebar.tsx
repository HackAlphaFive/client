import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

// Определение типа для одного элемента в массиве items
export type SidebarItem = {
  href: string;
  text: string;
  target?: string;
};

// Определение типов для props компонента Sidebar
export type SidebarProps = {
  items: SidebarItem[];
};

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.sidebarList}>
          {items.map((item, index) => (
            <li key={index} className={styles.sidebarItem}>
            <Link to={item.href}>{item.text}</Link>
        </li>
      ))}
    </ul>
  </nav>
</aside>
);
};

export default Sidebar;
