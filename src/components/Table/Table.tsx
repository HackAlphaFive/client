import React, { FC, ReactNode } from 'react';
import styles from './Table.module.css';

type TProps = {
  /**
   * Ячейки таблицы, включая ячейки шапки
   */
 children: ReactNode,
 /**
  * Настройки для колонок – grid-template-columns
  */
 gridParams: string,
};

const Table: FC<TProps> = ({ children, gridParams }): JSX.Element => {

  /*if (mode === 'IPRForSubordinates') {
    setGridParams('36.219% 42.897% 20.884%');
  } else if (mode === 'myIPR') {
    setGridParams('60.489% 20.884% 18.627%');
  } else {
    setGridParams('58.232% 20.884% 20.884%');
  }*/

  return (
    <div className={styles.header} style={{
      gridTemplateColumns: gridParams,
    }}>
      {children}
    </div>
  )
}

export default Table;
