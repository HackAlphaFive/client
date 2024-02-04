import React, { FC, useState } from 'react';
import styles from './TabFiltrText.module.css';
import { InputAutocompleteDesktop } from '@alfalab/core-components/input-autocomplete/desktop';
import UserTab from '../UserTab/UserTab';
import { Typography } from '@alfalab/core-components/typography';
import { BaseOption } from '@alfalab/core-components/select/shared';
import Magnifier from '../Icons/Magnifier/Magnifier';
import { DimensionsListIcons } from '../../utils/types';
import { Gap } from '@alfalab/core-components/gap';
import { TResponseGetSubordinate } from '../../utils/api/types';
import { dataForFilterText } from '../../utils/mock/mock';
import { useDispatch, useSelector } from '../../services/hooks';
import { getSubordPending, getSubordSuccess, getSubordinatesFromStore } from '../../services/selectors/authSelector';
import { getSubordinates } from '../../services/middlewares/authQueries';
import { Spinner } from '@alfalab/core-components/spinner';
import { clearFilteringPage, clearFilteringSubordLastName, setFilteringSubordLastName } from '../../services/slices/IPRsSlice';
import { setIdForCreate, setPhoto } from '../../services/slices/singleIPRSlice';

type TProps = {
  needMagnifier?: boolean;
  myLabel?: string;
  myWidth?: string;
  disabled?: boolean;
};

const TabFiltrText: FC<TProps> = ({
  needMagnifier = true,
  myLabel = 'Поиск по ФИО',
  myWidth = '385px',
  disabled,
}) => {

  const dispatch = useDispatch();

  const subordPending = useSelector(getSubordPending);
  const subordSuccess = useSelector(getSubordSuccess);
  const subordinates = useSelector(getSubordinatesFromStore);

  type TOption = {
    key: string,
    content: JSX.Element,
  };

  const options = !subordinates.length ? null : subordinates.map((el) => ({
    key: String(el.id),
    content: (
      <>
        <Gap size='xs' />
        <UserTab
          avatar={el.photo}
          username={`${el.last_name} ${el.first_name} ${el.patronymic}`}
          position={el.position}
          cellExtraClassNameCell={styles.cell}
          onClick={() => {
            dispatch(clearFilteringPage());
            dispatch(setFilteringSubordLastName(el.last_name));
            dispatch(setIdForCreate(el.id));
            dispatch(setPhoto(el.photo))}
          }
        />
        <Gap size='xs' />
      </>
    )
  }));

  const [showInModal, setShowInModal] = useState(false);
  const [value, setValue] = useState('');

  const matchOption = (option: TOption, inputValue: string | undefined) => {
    return option.content.props.children[1].props.username.toLowerCase().includes((inputValue || '').toLowerCase());
  }

  const handleInput = (_: React.ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => {
    setValue(value);
  };

  const handleChange = ({ selected }: {selected: any }) => {
    setValue(selected ? selected.content.props.children[1].props.username : '');
  };

  const inputValues = value.replace(/ /g, '').split(',');


  const selectedOptions = options?.filter((option) => inputValues.includes(option.key.trim()));

  const selected = options?.find((o) => o.key === inputValues[0]) || [];

  const getFilteredOptions = () => {
    if (!options) return [{ key: 'spinner', content: <Spinner size='xs' />}];
    return options.some(({ key }) => key === value)
      ? options
      : options.filter((option) => matchOption(option, value));
  };

  return (
    <div style={{ width: myWidth }}>
      <InputAutocompleteDesktop
        size='xl'
        selected={selected}
        block={true}
        options={getFilteredOptions()}
        label={myLabel}
        placeholder='Иванов Пётр Абрамович'
        onChange={handleChange}
        onInput={handleInput}
        value={value}
        Arrow={undefined}
        multiple={false}
        allowUnselect={true}
        Option={BaseOption}
        showEmptyOptionsList={true}
        closeOnSelect={true}
        optionsListClassName={styles.optionsList}
        visibleOptions={4}
        optionsListWidth='field'
        disabled={disabled}
        onFocus={() => {
          dispatch(getSubordinates());
        }}
        inputProps={{
          onClear: () => {
            setValue('');
            dispatch(clearFilteringPage());
            dispatch(clearFilteringSubordLastName());
          },
          clear: true,
          leftAddons: needMagnifier ? (<Magnifier size={DimensionsListIcons.l} classNameWrapper={styles.magnifier} />) : undefined,
        }}
        optionsListProps={{
          emptyPlaceholder: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography.Text view='component-primary'>
                Сотрудник не найден
              </Typography.Text>
            </div>
          ),
        }}
      />
    </div>
      )
    }

export default TabFiltrText;
