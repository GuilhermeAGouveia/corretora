import styled from "styled-components";
import colors from "../styles/colors";

interface SlideBannerProps {
  width?: number;
  height?: number;
}

const SlideBanner = (props: SlideBannerProps) => {
  return (
    <SlideBannerContainer {...props}>
      <SlideBannerContent nCards={2}>

        <SlideBannerCard>
          <SlideBannerTitle>Compra</SlideBannerTitle>
        </SlideBannerCard>

        <SlideBannerCard>
          <SlideBannerTitle>Vende</SlideBannerTitle>
        </SlideBannerCard>
        
      </SlideBannerContent>
      <SlideBannerBg />
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

const SlideBannerContent = styled<any>('div')`
  position: absolute;
  width: ${props => `calc(${props.nCards} * 100%)`};
  display: flex;
  justify-content: center;
  align-items: center;
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

const SlideBannerTitle = styled.div`
  position: relative;
  color: ${colors.primary};
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
`;
