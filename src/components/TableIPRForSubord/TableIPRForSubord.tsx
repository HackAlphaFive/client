import React, { FC } from 'react';
import Table from '../Table/Table';
import styles from './TableIPRForSubord.module.css';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';
import TabFiltrText from '../TabFiltrText/TabFiltrText';
import { TResponseGetSomeUser, T_IPR } from '../../utils/api/types';
import IPRRow from '../IPRRow/IPRRow';
import { useSelector } from '../../services/hooks';
import { getUserRole } from '../../services/selectors/authSelector';
import { getUniqId } from '../../utils/utils';
import { getSubordIPRsPending, getSubordIPRsSuccess } from '../../services/selectors/IPRsSelector';
import { Spinner } from '@alfalab/core-components/spinner';

type TProps = {
  data: T_IPR[];
};

const TableIPRForSubord: FC<TProps> = ({ data }) => {
  const isSuperior = useSelector(getUserRole);

  const subordIPRsPending = useSelector(getSubordIPRsPending);
  const subordIPRsSuccess = useSelector(getSubordIPRsSuccess);

  return (
    <Table
      gridParamsColumns='36.218% 42.897% 1fr'
      gridParamsAutoRows='120px'
    >
      <TabFiltrText />

      <div className={`${styles.titleWrapper} `}>
        <p className='text text_type_middle text_color_tooltip-dark'>Название</p>
      </div>

      <TabFiltrStatus width='188px' />

      {subordIPRsPending && (
        <div className={styles.forSpinner}>
          <Spinner size='m' visible={true} />
        </div>
      )}

      {!subordIPRsPending && subordIPRsSuccess && data.length > 0 && data.map(ipr => {
        return (
          <IPRRow
            isLeader={isSuperior}
            tab='employeeIPR'
            ipr={ipr}
            extraClass={styles.forRow}
            key={getUniqId()}
          />
        )
      })}

      {!subordIPRsPending && subordIPRsSuccess && !data.length && (
        <div className={styles.forError}>
          По заданным условиям данных не найдено
        </div>
      )}

      {subordIPRsSuccess === false && (
        <div className={styles.forError}>
          Произошла ошибка. Пожалуйста, попробуйте ещё раз позднее
        </div>
      )}
    </Table>
  )
}

export default TableIPRForSubord;
