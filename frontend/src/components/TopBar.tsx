import styled, { css } from "styled-components";
import { useAuth } from "../context/Auth";
import useDeviceDetect from "../hooks/useDeviceDetect";
import {AiFillBackward} from "react-icons/ai"
import colors from "../styles/colors";
import { useRouter } from "next/router";
import MenuLateral from "./Page/lista/MenuLateral";
import MenuUserOptions from "./Page/lista/MenuUserOptions/index";

interface TopBarProps {
  pageName: string;
}
<<<<<<< HEAD
const TopBar = ({pageName}: TopBarProps) => {
=======
const TopBar = ({pageName}: HeaderProps) => {
>>>>>>> main
  const router = useRouter();
  const { user } = useAuth();
  const { isMobileView } = useDeviceDetect();

  return (
    <TopBarContainer isMobileView={isMobileView}>
      <TopBarContent>
        <MenuLateral></MenuLateral>
        {pageName && <TitlePage>{pageName}</TitlePage>}
        <RightButtons>
          <BackButton onClick={() => router.back()}>
            <AiFillBackward size={30} color={colors.white}></AiFillBackward>
          </BackButton>
          <MenuUserOptions />
        </RightButtons>
      </TopBarContent>
    </TopBarContainer>
  );
};

export default TopBar;
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

const TopBarContainer = styled.header<{isMobileView: boolean}>`
  ${({ isMobileView }) => deviceStyles[isMobileView ? "mobile" : "desktop"]}
  height: auto;
  background: ${colors.secondary};
`;

const TopBarContent = styled.div`
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
