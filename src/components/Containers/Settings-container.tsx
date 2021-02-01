import React from 'react';
import SettingsContent from '../Content/Settings/SettingsContent';
import useSettings from '../../hooks/useSettings';

const SettingsContainer: React.FC = () => {
  const { data } = useSettings();

  return (
    <>
      <SettingsContent data={data} />
    </>
  );
};

export default SettingsContainer;
