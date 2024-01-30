import React, { useEffect, useState } from 'react';
import { TabsDesktop, Tab } from '@alfalab/core-components/tabs/desktop';
import { Gap } from '@alfalab/core-components/gap';
import { useSelector } from '../../services/hooks';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { ReactComponent as Add } from '../../assets/Add.svg';
import UserTab from '../../components/UserTab/UserTab';
import photoIMG from '../../images/Avatar.png';
import IPRRow from '../../components/IPRRow/IPRRow';
import { IPRExample, noIPRExample } from '../../utils/mock/mock';

function IPRPage() {
  // TODO
  const user = {
    photo: photoIMG,
    username: 'Раисовна Раиса Балахмутовна',
    position: 'Lead prdocut giga-girl',
  }

  // TODO реальный useSelector
  const isSupervisor = useSelector(() => true);

  const TABS = [
    { title: 'ИПР сотрудников', id: 'subordinates' },
    { title: 'Мой ИПР', id: 'me' },
  ];
  const EMPLOYEE_TABS = [
    { title: 'Мой ИПР', id: 'me' },
  ];
  const [tabs, setTabs] = useState(TABS);

  const [selectedId, setSelectedId] = useState<string | number>(tabs[0].id);

  useEffect(() => {
    if (!isSupervisor) {
      setTabs(EMPLOYEE_TABS);
      setSelectedId(EMPLOYEE_TABS[0].id);
    } else {
      setTabs(TABS);
      setSelectedId(TABS[0].id);
    }
  }, [isSupervisor]);

  const handleChange = (event: React.MouseEvent<Element, MouseEvent>, { selectedId }: { selectedId: string | number }) => {
    setSelectedId(selectedId);
  };

  return (
    <>
      <h1 className='text text_type_heading1'>Индивидиуальный план развития (ИПР)</h1>
      <Gap size='4xl' />
      <TabsDesktop
        view='primary'
        size='xl'
        selectedId={selectedId}
        onChange={handleChange}
        scrollable={false}
      >
        {tabs.map((item) => (
          <Tab title={item.title} id={item.id} key={item.id} />
        ))}
      </TabsDesktop>

      {selectedId === 'subordinates' && (
        <>
          <Gap size='2xl' />
          <ButtonDesktop
            view='accent'
            leftAddons={<Add />}
          >
            Создать новый ИПР
          </ButtonDesktop>
          <Gap size='xl' />

          <div>Список ипр РАБОТНИКОВ</div>
          <IPRRow isLeader={isSupervisor} tab='employeeIPR' ipr={IPRExample}/>
          <IPRRow isLeader={isSupervisor} tab='employeeIPR' ipr={noIPRExample}/>
        </>
      )}

      {selectedId === 'me' && (
        <>
          <Gap size='3xl' />
          <UserTab
            avatar={user.photo}
            username={user.username}
            position={user.position}
          />
          <Gap size='4xl' />
          <IPRRow isLeader={false} tab='myIPR' ipr={IPRExample}/>
          <div>Список моих ипр будет тут</div>
        </>
      )}
    </>
  );
}

export default IPRPage;
