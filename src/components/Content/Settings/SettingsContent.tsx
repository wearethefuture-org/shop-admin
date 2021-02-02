import React from 'react';

import { ISettingsItem } from '../../../interfaces/ISettings';
import SettingsAccordion from './SettingsAccordion/SettingsAccordion';
import s from './SettingsContent.module.scss';

interface SettingsDataProps {
  data: Array<ISettingsItem>;
}

const SettingsContent: React.FC<SettingsDataProps> = ({ data }) => {
  return (
    <div className={s.container}>
      {data.map((item) => (
        <SettingsAccordion key={item.id} data={item} />
      ))}
    </div>
  );
};

export default SettingsContent;
