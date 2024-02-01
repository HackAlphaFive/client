import React from 'react';
import Table from '../Table/Table';
import styles from './TableIPRForSubord.module.css';
import TabFiltrStatus from '../TabFiltrStatus/TabFiltrStatus';
import TabFiltrText from '../TabFiltrText/TabFiltrText';

function TableIPRForSubord() {
  return (
    <Table
      gridParams='36.218% 42.897% 20.884%'
    >
      <TabFiltrText />
      <div className={`${styles.titleWrapper} `}>
        <p className='text text_type_middle text_color_tooltip-dark'>Название</p>
      </div>
      <TabFiltrStatus width='188px' />
    </Table>
  )
}

export default TableIPRForSubord;
