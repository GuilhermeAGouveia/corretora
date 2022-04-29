import { Menu, MenuDivider, MenuHeader, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import styled from "styled-components";
import { useAuth } from "../../../context/Auth";

const MenuUserOptions = () => {
  const { user } = useAuth();
  return (
    <MenuContainer
      menuButton={<MenuButton>{user?.firstName || "Convidado"}</MenuButton>}
      direction={"bottom"}
      offsetX={-80}      
      
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
      <MenuItem>Logout</MenuItem>
    </MenuContainer>
  );
};

export default MenuUserOptions;

const MenuButton = styled.button`
  position: relative;
  width: 100px;
  right: 0;
  background: transparent;
  border: none;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  color: white;

`;

const MenuContainer= styled(Menu)`
  position: absolute;
  `;