import { useState, useEffect } from 'react';
import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { DimensionsListIcons, StatusList, StatusListRU } from '../../utils/types';
import FilterDropDown from '../Icons/FilterDropDown/FilterDropDown';
import { translateStatus } from '../../utils/utils';
import { Radio } from '@alfalab/core-components/radio';
import styles from './TabFiltrStatus.module.css';
import { Gap } from '@alfalab/core-components/gap';

type TProps = {
  popoverWidth?: string;
  mode?: 'ipr' | 'task';
}

function TabFiltrStatus({popoverWidth = '206px', mode = 'ipr'} : TProps): JSX.Element {
  const options = [
    // content рисуется в инпуте при выборе данного пункта
    { key: '0', content: <div className={`${styles.item} text_color_main text_type_middle`}>Все статусы</div> },
    { key: '1', content: <div className={`${styles.item} text_color_main text_type_middle`}>{StatusListRU.Failed}</div> },
    { key: '2', content: <div className={`${styles.item} text_color_main text_type_middle`}>{StatusListRU.InProgress}</div> },
    { key: '3', content: <div className={`${styles.item} text_color_main text_type_middle`}>{StatusListRU.NoStatus}</div> },
    { key: '4', content: <div className={`${styles.done} ${styles.item} text_type_middle`}>{StatusListRU.Done}</div> },
    { key: '5', content: <div className={`${styles.canceled} ${styles.item} text_type_middle`}>{StatusListRU.Canceled}</div> },
  ];

  const [selected, setSelected] = useState<StatusList | undefined>(undefined);

  return (
    <SelectDesktop
      options={options}
      placeholder='Выберите статус'
      label='Статус ИПР'
      multiple={false}
      block={true}
      size='xl'
      optionsListClassName={styles.popover}
      Arrow={() => <FilterDropDown size={DimensionsListIcons.l} />}
      Option={({
        option,
        selected,
        innerProps
      }) => {
        if (mode === 'task' && option.key === '3') {
          return null
        } else {
          return (
            <div style={{width: popoverWidth}}>
              <Radio
                size='m'
                checked={selected}
                label={option.content}
                block={true}
                align='center'
                // @ts-ignore
                labelProps={innerProps}
                circleClassName={styles.circle}
              />
              <Gap size='l'></Gap>
            </div>)
        }
      }}
      onChange={(payload) => {
        // SelectDesktop прокидывает сюда пропс payload, внутри которого хранятся данные о выборе
        const key = payload.selected?.key;
        const value = options.filter(option => option.key === key)[0].content.props.children as StatusListRU;
        setSelected(translateStatus(value, 'ru-en') as StatusList | undefined);
      }}
    />
  )
}

export default TabFiltrStatus;
