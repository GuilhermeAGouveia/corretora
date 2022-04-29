import styled from "styled-components";
import { useAuth } from "../../context/Auth";
import colors from "../../styles/colors";
import LogoComponent from "../Logo";
import MenuUserOptions from "./MenuUserOptions/index";

const HeaderLista = () => {
  const { user } = useAuth();
  return (
    <Header>
        <TopBar>
            <LogoComponent/>
            <MenuUserOptions/>
        </TopBar>
    </Header>
  );
};

export default HeaderLista;

const Header = styled.header`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.secondary};
`;

const TopBar = styled.div`
    position: relative; 
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
`;