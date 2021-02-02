import React from 'react';
import { useDispatch } from 'react-redux';

import { ISettingsItem } from '../../../interfaces/ISettings';
import WidgetForm from './WidgetsSettings/Widget-form';

interface SettingsFormProps {
  data: ISettingsItem;
}

const SettingsForms: React.FC<SettingsFormProps> = ({ data }) => {
  const dispath = useDispatch();

  switch (data.name) {
    case 'widgets':
      return <WidgetForm data={data} dispatch={dispath} />;
    default:
      return null;
  }
};

export default SettingsForms;
