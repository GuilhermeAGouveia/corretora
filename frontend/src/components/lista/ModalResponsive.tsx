import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import styled from "styled-components";

interface ModalResponsiveProps {
  children: React.ReactNode;
  isMobile: boolean;
  buttonContent: ReactElement;
}

const ModalResponsive = ({
  children,
  buttonContent,
  isMobile,
}: ModalResponsiveProps) => {
    const buttonActionRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);
  return (
    <AnimatePresence>
      {isMobile && (
        <ActionButton
          onClick={() => setIsActive((oldState) => !oldState)}
          ref={buttonActionRef}
        >
          {buttonContent}
        </ActionButton>
      )}
      {(!isMobile || isActive) && (
        <FilterContainer
          positionindicator={ buttonActionRef.current?.getBoundingClientRect().left}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          {children}
        </FilterContainer>
      )}
    </AnimatePresence>
  );
};

export default ModalResponsive;

const FilterContainer = styled(motion.div)<any>`
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    position: absolute;
    width: 95%;
    top: 45px; // 30px do button mais 15 px de distancia
    left: 2.5%;
    z-index: 2;
    border-radius: 5px;
    background: white;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

    &:before {
      content: "";
      position: absolute;
      top: -5px;
      left: ${(props: any) => props.positionindicator}px;
      width: 10px;

      height: 10px;
      transform: rotate(45deg);
      background: white;
    }
  }
`;

const ActionButton = styled.button`
  position: relative;
  color: #fff;
  width: 30px;
  height: 30px;
  border: none;
`;
