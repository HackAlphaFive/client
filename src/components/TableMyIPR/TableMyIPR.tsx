import React, { FC } from 'react';
import Table from '../Table/Table';
import styles from './TableMyIPR.module.css';
import TabFiltrDate from '../TabFiltrDate/TabFiltrDate';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';
import { T_IPR } from '../../utils/api/types';
import IPRRow from '../IPRRow/IPRRow';
import { useSelector } from '../../services/hooks';
import { getUniqId } from '../../utils/utils';
import { getIsIPRQueryFullish, getMyIPRsPending, getMyIPRsSuccess } from '../../services/selectors/IPRsSelector';
import { Spinner } from '@alfalab/core-components/spinner';

type TProps = {
  data: Array<T_IPR>;
}

const TableMyIPR: FC<TProps> = ({ data }): JSX.Element => {
  const myIPRsPending = useSelector(getMyIPRsPending);
  const myIPRsSuccess = useSelector(getMyIPRsSuccess);
  const isIPRQueryFullish = useSelector(getIsIPRQueryFullish);

  const isEmpty = !isIPRQueryFullish && !myIPRsPending && myIPRsSuccess === true && !data.length;

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

        {myIPRsPending && (
        <div className={styles.forSpinner}>
          <Spinner size='m' visible={true} />
        </div>
        )}

        {!myIPRsPending && myIPRsSuccess && data.length > 0 && data.map(ipr => (
          <IPRRow
            // в таблице "мой ипр" текущий юзер не можешь управлять ипр, назначенными ему
            isLeader={false}
            tab='myIPR'
            ipr={ipr}
            extraClass={styles.forRow}
            key={getUniqId()}
          />
        ))}

        {isIPRQueryFullish && !myIPRsPending && myIPRsSuccess && !data.length && (
          <div className={styles.forError}>
            По заданным условиям данных не найдено
          </div>
        )}

        {isEmpty && (
          <div className={styles.forError}>
            Вам не назначен ни один ИПР
          </div>
        )}

        {myIPRsSuccess === false && (
          <div className={styles.forError}>
            Произошла ошибка. Пожалуйста, попробуйте ещё раз позднее
          </div>
        )}
      </Table>
    </div>
  )
}

export default TableMyIPR;
