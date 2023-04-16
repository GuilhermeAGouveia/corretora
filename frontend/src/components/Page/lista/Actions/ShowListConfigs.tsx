import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { getAllCidades } from "../../../../lib/externalData";
import { FilterValues } from "../../../../lib/interfaces";
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  ActionButton,
  ActionContainer,
  ActionContent,
  ActionItem,
  ActionLabel,
} from "./styles";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ConfigValues {
  showOwner: boolean;
  listType: "page" | "infinite";
}

interface ShowConfigsProps {
  configValues: ConfigValues;
}

const ShowConfigs = () => {
  const [configValues, setConfigValues] = useState<ConfigValues>({
    showOwner: false,
    listType: "page",
  });
  const { control, handleSubmit, register } = useForm();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    configKey: keyof ConfigValues,
    configValue: any
  ) => {
    setConfigValues((prev) => ({ ...prev, [configKey]: configValue }));
  };    

  return (
    <ActionContainer>
      <ActionContent>
        <ActionItem>
          <ActionLabel>
            <h4>Listagem</h4>
          </ActionLabel>

          <ToggleButtonGroup size="small" value={configValues} onChange={(e, value) => handleChange(e, "listType", value)} exclusive fullWidth>
            <ToggleButton value="page" key="page">
              <ViewArrayIcon />
            </ToggleButton>
            <ToggleButton value="infinite" key="infinite">
              <ViewDayIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ActionItem>
        <ActionItem>
          <ActionLabel>
            <h4>Exibir dono</h4>
          </ActionLabel>

          <ToggleButtonGroup size="small" value={configValues} onChange={(e, value) => handleChange(e, "showOwner", value)} exclusive fullWidth>
            <ToggleButton value={true} key="showOwner">
              <VisibilityIcon />
            </ToggleButton>
            <ToggleButton value={false} key="notShowOwner">
              <VisibilityOffIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ActionItem>
      </ActionContent>
    </ActionContainer>
  );
};

export default ShowConfigs;
