import { Skeleton } from "@mui/material";
import styled from "styled-components";
import useDeviceDetect from "../../hooks/useDeviceDetect";

export default function Loading() {
  const { isMobileView } = useDeviceDetect();
  const retangularStyle = {
    borderRadius: "5px",
    margin: "20px",
  };
  return (
    <Main isMobile={isMobileView}>
      <FlexBox isMobile={false} style={{
        flexDirection: "row",
        justifyContent: "flex-start",
      }}>
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          sx={{
            margin: "20px",
          }}
        />

        <Skeleton
          variant="rectangular"
          width={100}
          height={40}
          sx={{
            borderRadius: "5px",    
          }}
        />
      </FlexBox>
      <FlexBox isMobile={isMobileView}>
        <Skeleton
          variant="rectangular"
          width={250}
          height={isMobileView ? 210 : 250}
          sx={retangularStyle}
        />
        <Skeleton
          variant="rectangular"
          width={250}
          height={isMobileView ? 210 : 250}
          sx={retangularStyle}
        />
        {!isMobileView && (
          <Skeleton
            variant="rectangular"
            width={250}
            height={250}
            sx={retangularStyle}
          />
        )}
      </FlexBox>
      {isMobileView && (<FlexBox isMobile={false}>
        <Skeleton
          variant="rectangular"
          width={150}
          height={150}
          sx={{
            borderRadius: "5px",
            margin: "10px",
          }}
        />
        <Skeleton
          variant="rectangular"
          width={150}
          height={150}
          sx={{
            borderRadius: "5px",
            margin: "10px",
          }}
        />
      </FlexBox>)}

    </Main>
  );
}

const FlexBox = styled.div<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Main = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  margin-top: ${(props) => (props.isMobile ? "0px" : "50px")};
`;
