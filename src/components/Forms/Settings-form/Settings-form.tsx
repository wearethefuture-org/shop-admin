import React from "react";
import { ISettingsItem } from "../../../interfaces/ISettings";
import WidgetSettingsForm from "./WidgetsSettings/WidgetSettings";

interface SettingsFormProps {
  data: ISettingsItem;
}

const SettingsForms: React.FC<SettingsFormProps> = ({ data }) => {
  switch (data.name) {
    case "widgets":
      return <WidgetSettingsForm data={data} />;
    default:
      return null;
  }
};

export default SettingsForms;
