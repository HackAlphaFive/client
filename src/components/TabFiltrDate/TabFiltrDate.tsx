import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { useState, useEffect, useMemo, useCallback } from 'react';
import FilterDropDown from '../Icons/FilterDropDown/FilterDropDown';
import { DimensionsListIcons } from '../../utils/types';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import styles from './TabFiltrDate.module.css';
import { usePeriod, usePeriodWithReset } from '@alfalab/core-components/calendar/usePeriod';

type TProps = {
  calendarWidth?: number;
  disabled?: boolean;
};

function TabFiltrDate({ calendarWidth = 340, disabled }: TProps) {
  type TMySelected = {
    front: string,
    back: {
      start: string,
      end: string
    }
  };

  const [mySelected, setMySelected] = useState<TMySelected>();

  const options = [{ key: '0', content: '' }];
  const isClarification = true;
  const allowSelectionFromEmptyRange = false;

  const {
    selectedFrom: selectedFromClarification,
    selectedTo: selectedToClarification,
    updatePeriod: updatePeriodClarification,
  } = usePeriod();

  const {
    selectedFrom: selectedFromReset,
    selectedTo: selectedToReset,
    updatePeriod: updatePeriodReset,
  } = usePeriodWithReset();

  const updatePeriod = useMemo(() => {
    return isClarification ? updatePeriodClarification : updatePeriodReset;
  }, [isClarification, updatePeriodClarification, updatePeriodReset]);


  const getDateString = useCallback((date: Date, mode: 'front' | 'back' = 'front') => {
    if (!date) return '';

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();

    if (mode === 'front') return `${day}.${month}.${year}`;
    return `${year}-${month}-${day}`;
  }, []);

  const selectedFrom = useMemo(() => {
    return isClarification ? selectedFromClarification : selectedFromReset;
  }, [isClarification, selectedFromClarification, selectedFromReset]);

  const selectedTo = useMemo(() => {
    return isClarification ? selectedToClarification : selectedToReset;
  }, [isClarification, selectedToClarification, selectedToReset]);

  const selectedRange = useMemo(() => {
    if (selectedFrom && selectedTo) {
      const selectedFromDate = new Date(selectedFrom);
      const selectedToDate = new Date(selectedTo);
      const valueFront = `${getDateString(selectedFromDate)}–${getDateString(selectedToDate)}`;
      const valueBack = {
        start: `${getDateString(selectedFromDate, 'back')}`,
        end: `${getDateString(selectedToDate, 'back')}`,
      };
      setMySelected({ front: valueFront, back: valueBack });
      return valueFront;
    }

    if (allowSelectionFromEmptyRange) {
      if (selectedFrom) {
        const selectedFromDate = new Date(selectedFrom);
        return `${getDateString(selectedFromDate)}`;
      } else if (selectedTo) {
        const selectedToDate = new Date(selectedTo);
        return `${getDateString(selectedToDate)}`;
      }
    }

    return '';
  }, [allowSelectionFromEmptyRange, selectedFrom, selectedTo]);

  const calendarStyles = {
    border: '1px solid rgba(233, 233, 235, 1)',
    borderRadius: '8px',
    boxShadow: `0px 20px 24px rgba(0, 0, 0, 0.08),
                0px 12px 16px rgba(0, 0, 0, 0.04),
                0px 4px 8px rgba(0, 0, 0, 0.04),
                0px 0px 1px rgba(0, 0, 0, 0.04)`,
  };

  return (
    <div>
      <SelectDesktop
        disabled={disabled}
        options={options}
        placeholder='Дата'
        multiple={false}
        block={true}
        size='xl'
        fieldClassName={styles.field}
        valueRenderer={() => {
          if (!mySelected) return null;
          return <div className='text_color_main text_type_small'>{mySelected.front}</div>;
        }}
        Arrow={() => <FilterDropDown size={DimensionsListIcons.l} />}
        Option={() => {
          return (
            <div style={{ width: `${calendarWidth}px` }}>
              <div style={calendarStyles}>
                <CalendarDesktop
                  responsive={true}
                  selectedFrom={selectedFrom}
                  selectedTo={selectedTo}
                  onChange={updatePeriod}
                  selectorView='month-only'
                  showCurrentYearSelector={true}
                  contentClassName={styles.calendarDay}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default TabFiltrDate;
