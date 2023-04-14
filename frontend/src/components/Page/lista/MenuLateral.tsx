import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import styled from "styled-components";
import colors from "../../../styles/colors";



const MenuLateral = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  return (
    <AnimatePresence>
      <ButtonMenuLateral onClick={handleClick}>
        <MenuOutlinedIcon sx={{
          fontSize: 20,
          color: colors.primary,
        }}/>
      </ButtonMenuLateral>
      {isActive && (
        <>
          <MenuLateralContainer
            initial={{ opacity: 0, x: -300, y: -300 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -300, y: -300 }}
          >
            <Item><FavoriteBorderIcon sx={{fontSize: "1rem"}}/><span>Favoritos</span></Item>
            <Item><HistoryEduOutlinedIcon sx={{fontSize: "1rem"}}/><span>Meus Contratos</span></Item>
            <Item onClick={() => router.push('/imoveis/my')}><AddHomeOutlinedIcon sx={{fontSize: "1rem"}}/><span>Meus Imóveis</span></Item>
          </MenuLateralContainer>
          <FalseBg onClick={() => setIsActive(false)}></FalseBg>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuLateral;

const FalseBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const MenuLateralContainer = styled(motion.div)`
  position: fixed;
  width: 80vw;
  max-width: 300px;
  height: 100vh;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Item = styled.div`
  position: relative;
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  display: flex;
    align-items: center;
    justify-content: flex-start;

  &:hover:before {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 4px;
    background: ${colors.primary};
  }

  &:hover {
      color: ${colors.primary};
  }

  span {
    margin-left: 10px;
  }
`;

const ButtonMenuLateral = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
`;
