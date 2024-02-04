import { FC, useState, useEffect } from 'react';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { DimensionsListIcons, StatusList, StatusListRU } from '../../utils/types';
import { translateStatus } from '../../utils/utils';
import { Radio } from '@alfalab/core-components/radio';
import styles from './TabForStatus.module.css';
import { Gap } from '@alfalab/core-components/gap';
import { useDispatch, useSelector } from '../../services/hooks';

type TProps = {
  mode: 'empty' | 'existing';
  disabled?: boolean;
  existingStatus?: StatusList;
}

const TabForStatus: FC<TProps> = ({ mode, disabled, existingStatus }): JSX.Element => {
  const dispatch = useDispatch();

  const width = '193px';
  const options = [
    { key: '1', content: <div className={`${styles.item} text_color_main text_type_middle`}>{StatusListRU.Failed}</div> },
    { key: '2', content: <div className={`${styles.done} ${styles.item} text_type_middle`}>{StatusListRU.Done}</div> },
    { key: '3', content: <div className={`${styles.canceled} ${styles.item} text_type_middle`}>{StatusListRU.Canceled}</div> },
  ];

  return (
    <div style={{width: width}}>
      <SelectDesktop
        disabled={mode === 'empty' ? true : disabled}
        options={options}
        label={'Статус ИПР'}
        multiple={false}
        block={true}
        size='xl'
        valueRenderer={({ selected }) => {
          if (mode === 'empty') return StatusListRU.NoStatus;
          if (mode === 'existing' && existingStatus) return existingStatus;
        }}
        Arrow={mode === 'empty' ? ()=><div></div> : undefined}
        optionsListClassName={styles.popover}
        Option={({ option, selected, innerProps }) => { return (
          <div style={{width: `${(Number(width) - 12)}`}}>
            <Radio
              size='m'
              checked={selected}
              label={option.content}
              block={true}
              align='center'
              // @ts-ignore
              labelProps={innerProps}
            />
            <Gap size='l'></Gap>
          </div>
        )}}
        onChange={(payload) => {
          const key = payload.selected?.key;
          const value = options.filter(option => option.key === key)[0].content.props.children;
        }}
      />
      {mode === 'existing' && <span className={`text text_type_small text_color_tooltip ${styles.statusTooltip}`}>Изменить статус ИПР</span>}
    </div>
  )
}

export default TabForStatus;
