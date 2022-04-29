import styled from "styled-components";
import { useAuth } from "../../context/Auth";
import colors from "../../styles/colors";
import MenuLateral from "./MenuLateral";
import MenuUserOptions from "./MenuUserOptions/index";

const HeaderLista = () => {
  const { user } = useAuth();
  return (
    <Header>
      <TopBar>
        <MenuLateral></MenuLateral>
        <RightButtons>
          <MenuUserOptions />
        </RightButtons>
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
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightButtons = styled.div`
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
