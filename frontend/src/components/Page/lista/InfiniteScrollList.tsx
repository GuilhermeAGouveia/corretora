import { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import loadingData from "../../../assets/lotties/loading.json";
import Lottie from "react-lottie";
import ListCards from "./ListCards";
import { IImovel } from "../../../lib/interfaces";
import { debounce } from "lodash";

interface InfiniteScrollListProps {
  data: IImovel[];
  cardComponent: React.FC<any>;
  onScrollEnd: () => Promise<void>;
}
export default function InfiniteScrollList({
  data,
  cardComponent,
  onScrollEnd,
}: InfiniteScrollListProps) {
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  function scrollEnd(func: () => Promise<any>) {
    console.log("OnScrollEnd");
    return async () => {
      const { scrollTop, clientHeight, scrollHeight } =
        window.document.getElementById(
          "infiniteScrollContainer"
        ) as HTMLElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setIsLoadingItems(true);
        await func();
        setIsLoadingItems(false);
      }
    };
  }

  return (
    <InfiniteScrollContainer
      id="infiniteScrollContainer"
      onScroll={debounce(scrollEnd(onScrollEnd), 1000)}
    >
      <ListCards imoveis={data} cardComponent={cardComponent} />
      {isLoadingItems && (
        <LoadingBottom>
          <Lottie
            options={{
              loop: true,
              autoplay: true,

              animationData: loadingData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={50}
            height={50}
          />
        </LoadingBottom>
      )}
    </InfiniteScrollContainer>
  );
}

const InfiniteScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.white};
  margin: 0 auto;
`;

const LoadingBottom = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
