import { motion } from "framer-motion";
import Image from "next/image";
import styled, { css, CSSProperties } from "styled-components";
import colors from "../styles/colors";

interface ContentCard {
  text: string;
  image?: string;
}

interface SlideBannerProps {
  style?: CSSProperties;
  direction?: "horizontal" | "vertical";
  contentCards: ContentCard[];
}

const SlideBanner = ({
  contentCards,
  direction,
  ...rest
}: SlideBannerProps) => {
  function getArrayTimeLineAnimation(length: number) {
    const arrayTimeLineAnimation: string[] = [];
    for (let i = 0; i < length; i++) {
      arrayTimeLineAnimation.push(`-${i * 100}%`, `-${i * 100}%`);
    }

    arrayTimeLineAnimation.push(`0%`, `0%`);
    return arrayTimeLineAnimation;
  }

  const directionAnimateProps = {
    horizontal: {
      left: getArrayTimeLineAnimation(contentCards.length),
      transition: {
        repeat: Infinity,
        duration: 10,
        staggerDirection: -1,
      },
    },
    vertical: {
      top: getArrayTimeLineAnimation(contentCards.length),
      transition: {
        repeat: Infinity,
        duration: 10,
        staggerDirection: -1,
      },
    },
  };

  return (
    <SlideBannerContainer {...rest}>
      <SlideBannerContent
        ncards={contentCards.length}
        animate={directionAnimateProps[direction || "horizontal"]}
        direction={direction || "horizontal"}
      >
        {contentCards.map((contentCard, index) => {
          return (
            <SlideBannerCard key={"slideHorizontalBannerCard" + index}>
              {contentCard.image && (
                <ImageContainer>
                  <Image
                    src={contentCard.image}
                    alt={"image"}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    quality={100}
                                      />
                </ImageContainer>
              )}
              <SlideBannerTitle hasImage={contentCard.image}>
                {contentCard.text}
              </SlideBannerTitle>
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
  width: 100%;
  height: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.direction === "horizontal"
      ? css`
          width: calc(${props.ncards} * 100%);
          flex-direction: row;
          height: 100%;
          left: 0;
        `
      : css`
          height: calc(${props.ncards} * 100%);
          flex-direction: column;
          width: 100%;
          top: 0;
        `}
`;

const SlideBannerCard = styled.div`
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
  width: ${(props) => (props.hasImage ? "40%" : "100%")};
  text-transform: uppercase;
  font-weight: bold;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  overflow: hidden;
`;
