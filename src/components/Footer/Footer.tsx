import React, { memo } from 'react';

import { Link } from '@alfalab/core-components/link';

import styles from './Footer.module.css';

type FooterProps = {
  items: { text: string; href: string }[];
};

const Footer: React.FC<FooterProps> = ({ items }) => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.footerList}>
          {items.map((item, index) => (
            <li key={index}>
              <Link
                view='primary'
                href={item.href}
                underline={false}
                className={styles.footerLink}
                target='_blank'
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default memo(Footer);
