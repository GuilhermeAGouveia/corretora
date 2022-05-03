import { motion } from "framer-motion";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import styled from "styled-components";
import colors from "../styles/colors";

interface InfoButtonProps {
  info: string;
  width: number;
  colorIcon?: string;
}

const InfoButton = ({ info, width, colorIcon }: InfoButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <InfoButtonContainer size={width} onHoverStart={handleIsOpen} onHoverEnd={handleIsOpen} onClick={handleIsOpen}>
      <FiInfo size={width * 0.9} color={colorIcon || colors.primary}></FiInfo>
      {isOpen && <InfoMessage>{info}</InfoMessage>}
    </InfoButtonContainer>
  );
};
export default InfoButton;

const InfoButtonContainer = styled(motion.div)<{ size: number }>`
  position: relative;
  margin: 0 5px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  cursor: pointer;
`;

const InfoMessage = styled.div<any>`
  position: absolute;
  top: 100%;
  width: 150px;
  background-color: ${colors.white};
  z-index: 1;
  font-size: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
