import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useRef, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ModalResponsiveProps {
  children: React.ReactNode;
  isMobile: boolean;
  buttonContent: ReactElement;
  title?: string;
  isPrimary?: boolean;
}

const ModalResponsive = ({
  children,
  buttonContent,
  isMobile,
  title,
  isPrimary
}: ModalResponsiveProps) => {
  const buttonActionRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <AnimatePresence>
      <>
        {isMobile && (
          <ActionButton
            onClick={() => setIsActive((oldState) => !oldState)}
            ref={buttonActionRef}
          >
            {buttonContent}
          </ActionButton>
        )}
        {isMobile ? isActive && (
          <>
            <MobileContent
              positionindicator={
                buttonActionRef.current?.getBoundingClientRect().left
              }
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
            >
              <ModalTitle>{title}</ModalTitle>
              {children}
            </MobileContent>
            {isActive && <FalseBgClickable onClick={() => setIsActive(false)} />}
          </>
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
       
              
            >
              <Typography fontWeight={"bold"}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
          </Accordion>
        )}

      </>
    </AnimatePresence>
  );
};

export default ModalResponsive;

const MobileContent = styled(motion.div) <any>`

    position: absolute;
    width: 95%;
    top: 45px; // 30px do button mais 15 px de distancia
    left: 2.5%;
    z-index: 3;
    border-radius: 5px;
    background: white;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

    &:before {
      content: "";
      position: absolute;
      top: -5px;
      left: ${(props: any) => props.positionindicator - 5}px;
      width: 10px;

      height: 10px;
      transform: rotate(45deg);
      background: white;
    }
`;

const ActionButton = styled.button`
  position: relative;
  color: #fff;
  background-color: transparent;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: none;

`;

const FalseBgClickable = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
`
export const ModalTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-size: larger;
  font-weight: bold;

  color: rgba(0, 0, 0, 0.9);
  padding:  10px 5px 0px 10px;
`;