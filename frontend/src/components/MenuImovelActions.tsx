import {Menu, MenuItem} from "@szhsin/react-menu";
import {FiMoreVertical} from "react-icons/fi";
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
        }}><FiMoreVertical size={30} color={colors.primary}/></button>
    )
}