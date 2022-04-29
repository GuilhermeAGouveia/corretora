import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import colors from "../../styles/colors";

const MenuLateral = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  return (
 
      <AnimatePresence>
        <ButtonMenuLateral onClick={handleClick}><FaBars size={20} color={colors.primary}></FaBars></ButtonMenuLateral>
        {isActive && (
            <>
          <MenuLateralContainer
            initial={{ opacity: 0, x: -300, y: -300 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -300, y: -300 }}
            >
            <Item>Favoritos</Item>
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
    z-index: 1;
`


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
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
`;

const ButtonMenuLateral = styled.button`
  position: relative;
  width: 50px;
  background: transparent;
    border: none;
`;
