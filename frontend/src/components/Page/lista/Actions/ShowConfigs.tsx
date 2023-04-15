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


const ShowConfigs = () => {
  const [listType, setListType] = useState("page");
  const { control, handleSubmit, register } = useForm();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setListType(newAlignment);
  };    

  return (
    <ActionContainer>
      <ActionContent>
        <ActionItem>
          <ActionLabel>
            <h4>Listagem</h4>
          </ActionLabel>

          <ToggleButtonGroup size="small" value={listType} onChange={handleChange} exclusive fullWidth>
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

          <ToggleButtonGroup size="small" value={listType} onChange={handleChange} exclusive fullWidth>
            <ToggleButton value="page" key="page">
              <VisibilityIcon />
            </ToggleButton>
            <ToggleButton value="infinite" key="infinite">
              <VisibilityOffIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ActionItem>
      </ActionContent>
    </ActionContainer>
  );
};

export default ShowConfigs;
