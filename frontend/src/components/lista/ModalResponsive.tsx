import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

interface ModalResponsiveProps {
    children: React.ReactNode;
    controlDisplay: boolean;
    positionIndicatorButtonAction: number;
}

const ModalResponsive = ({children, controlDisplay, positionIndicatorButtonAction}: ModalResponsiveProps) => {
    return (
        <AnimatePresence>
        {controlDisplay && (
          <FilterContainer
            positionIndicator={
                positionIndicatorButtonAction            }
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            {children}
          </FilterContainer>
        )}
      </AnimatePresence>
    )
}

export default ModalResponsive;

const FilterContainer = styled(motion.div)<any>`
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    position: absolute;
    width: 95%;
    top: auto;
    left: 2.5%;
    z-index: 2;
    border-radius: 5px;
    background: white;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

    &:before {
      content: "";
      position: absolute;
      top: -5px;
      left: ${(props: any) => props.positionIndicator}px;
      width: 10px;

      height: 10px;
      transform: rotate(45deg);
      background: white;
    }
  }
`;