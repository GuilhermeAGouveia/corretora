import {Menu, MenuItem} from "@szhsin/react-menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from "../styles/colors";

interface MenuImovelActionsProps {
    imovelId: string;
    onDelete?: (imovelId: string) => void;
    onEdit?: (imovelId: string) => void;
}

export default function MenuImovelActions({imovelId, onDelete}: MenuImovelActionsProps) {

    return (
        <Menu
            menuButton={MoreButton}
            direction={'bottom'}
        >
            <MenuItem>Editar</MenuItem>
            {onDelete && <MenuItem style={{color: "red"}} onClick={() => onDelete(imovelId)}>Excluir</MenuItem>}
        </Menu>
    )
}

function MoreButton() {
    return (
        <button style={{
            background: "transparent",
            border: "none",
        }}><MoreVertIcon sx={{
            fontSize: 30,
            color: colors.primary,
        }}/></button>
    )
}