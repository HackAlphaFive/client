import React from 'react';
import Table from '../Table/Table';
import styles from './TableMyIPR.module.css';
import TabFiltrDate from '../TabFiltrDate/TabFiltrDate';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';

function TableMyIPR() {
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
    </Table>
  )
}

export default TableMyIPR;
