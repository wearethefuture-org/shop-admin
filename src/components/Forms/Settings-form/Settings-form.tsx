import React from 'react';
import { useDispatch } from 'react-redux';
import useSnackBar from '../../../hooks/useSnackbar';

import { AppDispatch } from '../../../store/store';
import ParserForm from './ParserSettings/Parser-form';
import WidgetForm from './WidgetsSettings/Widget-form';

interface SettingsFormProps {
  name: string;
  parameters: any;
}

const SettingsForms: React.FC<SettingsFormProps> = ({ name, parameters }) => {
  const dispath: AppDispatch = useDispatch();
  const { handleClick } = useSnackBar();

  switch (name) {
    case 'widgets':
      return (
        <WidgetForm
          name={name}
          parameters={parameters}
          dispatch={dispath}
          handleClick={handleClick}
        />
      );
    case 'parser':
      return (
        <ParserForm
          name={name}
          parameters={parameters}
          dispatch={dispath}
          handleClick={handleClick}
        />
      );
    default:
      return null;
  }
};

export default SettingsForms;
