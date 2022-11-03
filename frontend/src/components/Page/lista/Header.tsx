import styled, { css } from "styled-components";
import { useAuth } from "../../../context/Auth";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import colors from "../../../styles/colors";
import MenuLateral from "./MenuLateral";
import MenuUserOptions from "./MenuUserOptions/index";

const HeaderLista = () => {
  const { user } = useAuth();
  const { isMobileView } = useDeviceDetect();

  return (
    <Header isMobileView={isMobileView}>
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
const deviceStyles = {
  mobile: css`
    position: fixed;
    bottom: 0;
    width: calc(100% - 20px);
    margin: 10px;
    
    border-radius: 5px;
    z-index: 2;
  `,
  desktop: css`
    position: relative;
    width: 100%;
  `,
};

const Header = styled.header<{isMobileView: boolean}>`
  ${({ isMobileView }) => deviceStyles[isMobileView ? "mobile" : "desktop"]}
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
