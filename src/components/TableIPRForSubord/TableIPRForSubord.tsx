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

type TProps = {
  data: { hunky: T_IPR[]; parasites: TResponseGetSomeUser[] };
};

const TableIPRForSubord: FC<TProps> = ({ data }) => {
  const isSuperior = useSelector(getUserRole);

  return (
    <Table
      gridParamsColumns='36.218% 42.897% 1fr'
    >
      <TabFiltrText />
      <div className={`${styles.titleWrapper} `}>
        <p className='text text_type_middle text_color_tooltip-dark'>Название</p>
      </div>
      <TabFiltrStatus width='188px' />
      {data.hunky.map(ipr => {
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
      {data.parasites.map(user => {
        return (
          <IPRRow
            isLeader={isSuperior}
            tab='employeeIPR'
            employee={user}
            extraClass={styles.forRow}
            key={getUniqId()}
          />
        )
      })}
    </Table>
  )
}

export default TableIPRForSubord;
