import React, { FC } from 'react';
import Table from '../Table/Table';
import styles from './TableMyIPR.module.css';
import TabFiltrDate from '../TabFiltrDate/TabFiltrDate';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';
import { T_IPR } from '../../utils/api/types';
import IPRRow from '../IPRRow/IPRRow';
import { useSelector } from '../../services/hooks';
import { getUserRole } from '../../services/selectors/authSelector';

type TProps = {
  data?: Array<T_IPR>;
}

const TableMyIPR: FC<TProps> = ({ data }): JSX.Element => {
  const isSuperior = useSelector(getUserRole);

  return (
    <Table
      // gridParams='60.489% 20.884% 18.627%'
      gridParams='58.232% 20.884% 20.884%'
    >
      <div className={`${styles.titleWrapper} `}>
        <p className='text text_type_middle text_color_tooltip-dark'>Название</p>
      </div>
      <TabFiltrDate calendarWidth={290}/>
      <TabFiltrStatus width='188px' />
      {data && data.map(ipr => {
        return (
          <IPRRow
            isLeader={isSuperior}
            tab='myIPR'
            ipr={ipr}
          />
        )
      })}
    </Table>
  )
}

export default TableMyIPR;
