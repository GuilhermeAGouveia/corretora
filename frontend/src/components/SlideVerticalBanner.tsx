import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "../styles/colors";

interface SlideBannerProps {
  width?: number;
  height?: number;
  contentCards: string[];
}

const SlideBanner = ({ contentCards, ...rest }: SlideBannerProps) => {
  function getArrayTimeLineAnimation(length: number) {
    const arrayTimeLineAnimation: string[] = [];
    for (let i = 0; i < length; i++) {
      arrayTimeLineAnimation.push(`-${i * 100}%`, `-${i * 100}%`);
    }

    arrayTimeLineAnimation.push(`0%`, `0%`);
    return arrayTimeLineAnimation;
  }

  return (
    <SlideBannerContainer {...rest}>
      <SlideBannerContent
        ncards={contentCards.length}
        animate={{
          top: getArrayTimeLineAnimation(contentCards.length),
          transition: {
            repeat: Infinity,
            duration: 10,
            staggerDirection: -1,
          },
        }}
      >
        {contentCards.map((contentCard, index) => (
          <SlideBannerCard key={"slideVerticalBannerCard" + index}>
            <SlideBannerTitle>{contentCard}</SlideBannerTitle>
            <SlideBannerBg />
          </SlideBannerCard>
        ))}
      </SlideBannerContent>
    </SlideBannerContainer>
  );
};

export default SlideBanner;

const SlideBannerContainer = styled<any>("div")`
  position: relative;
  min-width: 100px;
  min-height: 60px;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;
const SlideBannerBg = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${colors.tertiary};
  opacity: 0.2;
`;

const SlideBannerContent = styled<any>(motion.div)`
  position: absolute;
  height: ${(props) => `calc(${props.ncards} * 100%)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0%;
`;

const SlideBannerCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideBannerTitle = styled.div`
  position: relative;
  color: ${colors.primary};
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0px 10px;
  border-left: 4px solid ${colors.primary};
`;
