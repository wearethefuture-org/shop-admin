import React from 'react';
import { useDispatch } from 'react-redux';
import useSnackBar from '../../../hooks/useSnackbar';

import { ISettingsItem } from '../../../interfaces/ISettings';
import WidgetForm from './WidgetsSettings/Widget-form';

interface SettingsFormProps {
  data: ISettingsItem;
}

const SettingsForms: React.FC<SettingsFormProps> = ({ data }) => {
  const dispath = useDispatch();
  const { handleClick } = useSnackBar();

  switch (data.name) {
    case 'widgets':
      return (
        <WidgetForm data={data} dispatch={dispath} handleClick={handleClick} />
      );
    default:
      return null;
  }
};

export default SettingsForms;
