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
import { useListConfigs } from "../../../../context/ListSettings";
import BannerInfo, { useBannerInfo } from "../../../BannerInfo";
import { AlertType } from "../../../../lib/interfaces";

export interface ConfigValues {
  showOwner: boolean;
  listType: "page" | "infinite";
}

const ShowConfigs = () => {
  const { configs, setConfigsAndSave } = useListConfigs();
  const { setMessage, control: controlBanner} = useBannerInfo()
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    configKey: keyof ConfigValues,
    configValue: any
  ) => {
    setConfigsAndSave({ ...configs, [configKey]: configValue });
    setMessage(`Configurações alteradas: ${configKey}`, AlertType.SUCCESS)
  };    

  return (
    <ActionContainer>
      <ActionContent>
        <ActionItem>
          <ActionLabel>
            <h4>Listagem</h4>
          </ActionLabel>

          <ToggleButtonGroup size="small" value={configs.listType} onChange={(e, value) => handleChange(e, "listType", value)} exclusive fullWidth>
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

          <ToggleButtonGroup size="small" value={configs.showOwner} onChange={(e, value) => handleChange(e, "showOwner", value)} exclusive fullWidth>
            <ToggleButton value={true} key="showOwner">
              <VisibilityIcon />
            </ToggleButton>
            <ToggleButton value={false} key="notShowOwner">
              <VisibilityOffIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ActionItem>
      </ActionContent>
      <BannerInfo control={controlBanner}/>
    </ActionContainer>
  );
};

export default ShowConfigs;
