import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Link } from '@alfalab/core-components/link';

export type SidebarItem = {
  href: string;
  text: string;
  target?: string;
};

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
              <Link
                view='primary'
                Component={RouterLink}
                href={item.href}
                underline={false}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
