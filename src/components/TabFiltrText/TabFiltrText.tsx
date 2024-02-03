import React, { FC, useState } from 'react';
import styles from './TabFiltrText.module.css';
import { InputAutocompleteDesktop } from '@alfalab/core-components/input-autocomplete/desktop';
import UserTab from '../UserTab/UserTab';
import { Typography } from '@alfalab/core-components/typography';
import { BaseOption } from '@alfalab/core-components/select/shared';
import Magnifier from '../Icons/Magnifier/Magnifier';
import { DimensionsListIcons } from '../../utils/types';
import { Gap } from '@alfalab/core-components/gap';

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
  disabled }) => {

  type TOption = {
    key: string,
    content: JSX.Element,
  };

  const data = [
    {
      id: 1,
      username: "User01",
      firstname: "Саша",
      lastname: "Петров",
      patronymic: "Иванович",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 111111111111111,
      username: "User01",
      firstname: "Саша",
      lastname: "Петров",
      patronymic: "Иванович",
      email: "john1132@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 2,
      username: "User01",
      firstname: "Ив11111111111ан",
      lastname: "Ива11111111нов",
      patronymic: "Ив1212121анович",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 3,
      username: "User01",
      firstname: "Иван123",
      lastname: "Иванов123",
      patronymic: "Иванович123",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 4,
      username: "User01",
      firstname: "Иван333",
      lastname: "Иванов333",
      patronymic: "Иванович333",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 5,
      username: "User01",
      firstname: "Иван---",
      lastname: "Иванов---",
      patronymic: "Иванович---",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
    {
      id: 6,
      username: "User01",
      firstname: "Иван",
      lastname: "Иванов",
      patronymic: "Иванович",
      email: "john@email.com",
      position: "Junior product manager",
      photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
      superior: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ],
      subordinates: [
        {
          id: 1,
          name: "Петров Иван Иванович"
        }
      ]
    },
  ];

  const options: Array<TOption> = data.map((el) => {
    return {
      key: String(el.id),
      content: (
        <>
          <Gap size='xs' />
          <UserTab
            avatar={el.photo}
            username={`${el.lastname} ${el.firstname} ${el.patronymic}`}
            position={el.position}
            cellExtraClassNameCell={styles.cell}
          />
          <Gap size='xs' />
        </>
      )
    }
  });

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

  const selectedOptions = options.filter((option) => inputValues.includes(option.key.trim()));

  const selected = options.find((o) => o.key === inputValues[0]) || [];

  const getFilteredOptions = () => {
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
        inputProps={{
          onClear: () => setValue(''),
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
