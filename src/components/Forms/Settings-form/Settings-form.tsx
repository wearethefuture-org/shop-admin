import React from "react";
import { ISettingsItem } from "../../../interfaces/ISettings";
import WidgetSettingsForm from "./WidgetsSettings/WidgetSettings";

interface SettingsFormProps {
  data: ISettingsItem;
}

const reducerForms = (data: ISettingsItem) => {
  switch (data.name) {
    case "widgets":
      return <WidgetSettingsForm data={data} />;
    default:
      return null;
  }
};

const SettingsForms: React.FC<SettingsFormProps> = ({ data }) => {
  return reducerForms(data);
};

export default SettingsForms;
