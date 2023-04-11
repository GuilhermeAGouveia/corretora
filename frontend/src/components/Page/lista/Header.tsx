import styled, { css } from "styled-components";
import { useAuth } from "../../../context/Auth";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import {AiFillBackward} from "react-icons/ai"
import colors from "../../../styles/colors";
import { useRouter } from "next/router";
import MenuLateral from "./MenuLateral";
import MenuUserOptions from "./MenuUserOptions/index";

interface HeaderProps {
  pageName: string;
}
const HeaderLista = ({pageName}: HeaderProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { isMobileView } = useDeviceDetect();

  return (
    <Header isMobileView={isMobileView}>
      <TopBar>
        <MenuLateral></MenuLateral>
        {pageName && <TitlePage>{pageName}</TitlePage>}
        <RightButtons>
          <BackButton onClick={() => router.back()}>
            <AiFillBackward size={30} color={colors.white}></AiFillBackward>
          </BackButton>
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

const BackButton = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;

const Header = styled.header<{isMobileView: boolean}>`
  ${({ isMobileView }) => deviceStyles[isMobileView ? "mobile" : "desktop"]}
  height: auto;
  background: ${colors.secondary};
`;

const TopBar = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitlePage = styled.div`
  position: relative;
  width: 100%;
  margin-left: 10px;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: semi-bold;
  font-family: Montserrat, sans-serif;
  color: ${colors.primary};
`;

const RightButtons = styled.div`
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
