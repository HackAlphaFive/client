import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Link } from '@alfalab/core-components/link';
import { Typography } from '@alfalab/core-components/typography';

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
              {item.href.startsWith('http') ? (
                <Typography.Text view='primary-medium'>
                  <Link
                    view='default'
                    rel='noopener'
                    href={item.href}
                    target={item.target}
                  >
                    {item.text}
                  </Link>
                </Typography.Text>
              ) : (
                <Typography.Text view='primary-medium'>
                  <Link
                    view='default'
                    Component={RouterLink}
                    href={item.href}
                    underline={false}
                  >
                    {item.text}
                  </Link>
                </Typography.Text>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
