import React, { FC } from 'react';
import Table from '../Table/Table';
import styles from './TableMyIPR.module.css';
import TabFiltrDate from '../TabFiltrDate/TabFiltrDate';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';
import { T_IPR } from '../../utils/api/types';
import IPRRow from '../IPRRow/IPRRow';
import { useSelector } from '../../services/hooks';
import { getUserRole } from '../../services/selectors/authSelector';
import { getUniqId } from '../../utils/utils';

type TProps = {
  data: Array<T_IPR>;
}

const TableMyIPR: FC<TProps> = ({ data }): JSX.Element => {
  const isSuperior = useSelector(getUserRole);

  const isEmpty = data.length === 0;

  return (
    <div className={styles.wrapper}>
      <Table
        // gridParams='60.489% 20.884% 18.627%'
        // gridParamsColumns='58.232% 20.884% 20.884%' // строка немного уже шапки - потому появлялась маленькая вертикальная полоска серого фона шапки
        gridParamsColumns='58.232% 20.884% 1fr' // фикс серой полоски
        gridParamsAutoRows='120px'
      >
        <div className={`${styles.titleWrapper} `}>
          <p className='text text_type_middle text_color_tooltip-dark'>Название</p>
        </div>
        <TabFiltrDate calendarWidth={290} disabled={isEmpty} />
        <TabFiltrStatus width='188px' disabled={isEmpty} />
        {data?.length ? data.map(ipr => {
          return (
            <IPRRow
              isLeader={isSuperior}
              tab='myIPR'
              ipr={ipr}
              extraClass={styles.forRow}
              key={getUniqId()}
            />
          )
        }) : (
          <div className={`text text_type_middle ${styles.stub}`}>Для Вас не назначен ни один ИПР</div>
        )}
      </Table>
    </div>
  )
}

export default TableMyIPR;
