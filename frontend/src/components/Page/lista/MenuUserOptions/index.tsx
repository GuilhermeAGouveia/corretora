import { Menu, MenuDivider, MenuHeader, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";
import { useAuth } from "../../../../context/Auth";

interface MenuButtonProps {
  buttonTextColor?: string;
}

const MenuUserOptions = ({ buttonTextColor }: MenuButtonProps) => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <MenuContainer
      menuButton={
        <MenuButton style={{
          color: buttonTextColor || "white",
        }}>
          {user?.firstName || "Convidado"}
        </MenuButton>
      }
      direction={"bottom"}
      offsetX={-80}
      arrow={true}
    >
      <MenuItem>Meu perfil</MenuItem>
      <MenuItem>Save</MenuItem>
      <MenuItem>Close Window</MenuItem>
      <MenuDivider />
      <MenuHeader>Edit</MenuHeader>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuDivider />
      <MenuItemLogout onClick={handleLogout}>
        <LogoutIcon sx={{
          color: "red",
          fontSize: "1.2rem",
        }} />
        Sair
      </MenuItemLogout>
    </MenuContainer>
  );
};

export default MenuUserOptions;

const MenuButton = styled.button`
  position: relative;
  width: 100px;
  height: 20px;
  right: 0;
  background: transparent;
  border: none;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: white;
`;

const MenuContainer = styled(Menu)`
  position: absolute;
`;

const MenuItemLogout = styled(MenuItem)`
  color: red;
  height: 100%;
  margin: 0;
  outline: none;
  display: flex;
  justify-content: space-around;
`;
