import React, { FC, ReactNode } from 'react';
import styles from './Table.module.css';

type TProps = {
  /**
   * Ячейки таблицы, включая ячейки шапки
   */
 children: ReactNode;
 /**
  * Настройки для колонок – grid-template-columns
  */
 gridParamsColumns: string;
 /**
  * grid-auto-rows - для строк вне шапки
  */
 gridParamsAutoRows?: string;
 extraClass?: string;
};

const Table: FC<TProps> = ({ children, gridParamsColumns, gridParamsAutoRows = '72px', extraClass }): JSX.Element => {

  return (
    <div className={`${styles.header} ${extraClass}`} style={{
      gridTemplateColumns: gridParamsColumns,
      gridAutoRows: gridParamsAutoRows,
    }}>
      {children}
    </div>
  )
}

export default Table;
