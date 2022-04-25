import { AnimatePresence, motion, MotionAdvancedProps } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface BannerInfoProps {
  children: any;
  bgColor: string;
}

const BannerInfo = ({ bgColor, children }: BannerInfoProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <BannerInfoContainer
          bgcolor={bgColor}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
        >
          {children}
        </BannerInfoContainer>
      )}
    </AnimatePresence>
  );
};

export default BannerInfo;

const BannerInfoContainer = styled(motion.div)<{ bgcolor: string } & MotionAdvancedProps>`
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 5px;
  padding: 10px;

  max-width: 250px;
  color: white;
  background-color: ${(props) => props.bgcolor};
`;
