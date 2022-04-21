import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "../styles/colors";

interface ContentCard {
  text: string;
  image?: string;
}

interface SlideBannerProps {
  width?: number;
  height?: number;
  contentCards: ContentCard[];
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
          left: getArrayTimeLineAnimation(contentCards.length),
          transition: {
            repeat: Infinity,
            duration: 10,
            staggerDirection: -1,
          },
        }}
      >
        {contentCards.map((contentCard, index) => {
          if (index === 0) {
            return (
              <SlideBannerStaticCard key={"slideHorizontalBannerCard" + index}>
                <SlideBannerTitle hasImage={contentCard.image}>{contentCard.text}</SlideBannerTitle>
                <SlideBannerBg />
              </SlideBannerStaticCard>
            );
          }
          if (index === contentCards.length - 1) {
            return (
              <SlideBannerStaticCard key={"slideHorizontalBannerCard" + index}>
                <SlideBannerTitle  hasImage={contentCard.image}>{contentCard.text}</SlideBannerTitle>
                <SlideBannerBg />
              </SlideBannerStaticCard>
            );
          }

          return (
            <SlideBannerCard key={"slideHorizontalBannerCard" + index}>
              <SlideBannerImage
                src={contentCard.image || "https://via.placeholder.com/100"}
                alt={"image"}
                height={100}
                width={100}
              />
              <SlideBannerTitle  hasImage={contentCard.image}>{contentCard.text}</SlideBannerTitle>
              <SlideBannerBg />
            </SlideBannerCard>
          );
        })}
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
  width: ${(props) => `calc(${props.ncards} * 100%)`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  left: 0%;
`;

const SlideBannerCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideBannerStaticCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideBannerTitle = styled<any>("div")`
  position: relative;
  color: ${colors.primary};
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  width: ${props => props.hasImage ? '40%' : '100%'};
  text-transform: uppercase;
  font-weight: bold;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
`;

const SlideBannerImage = styled("img")`
  width: 60%;
  height: 100%;
`;
