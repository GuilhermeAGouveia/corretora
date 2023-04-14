import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import loadingData from "../../../assets/lotties/loading.json";
import Lottie from "react-lottie";
import ListCards from "./ListCards";
import { IImovel, Page } from "../../../lib/interfaces";
import { debounce, orderBy } from "lodash";
import { getImoveisByFilterWithPage } from "../../../lib/imovel";
import { CircularProgress, ImageList } from "@mui/material";
import { List } from "@mui/icons-material";

interface InfiniteScrollListProps {
  initialPage: Page<IImovel>;
  isLoadingInitialData: boolean;
  cardComponent: React.FC<any>;
  filterValues: any;
  orderByOptions: any;
}

let pageNumber = 1;

export default function InfiniteScrollList({
  initialPage,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData
}: InfiniteScrollListProps) {
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [page, setPage] = useState<Page<IImovel>>(initialPage);
  const [imoveis, setImoveis] = useState<IImovel[]>(initialPage.data);
  const getMoreImoveis = useCallback(async () => {
    // isLoadingItems é necessário para não carregar mais itens quando o usuário está carregando, evitando dados duplicados
    // !pageImoveis.data é necessário para não carregar mais itens quando a última pagina de dados já foi carregada, assim a
    // próxima terá um data vazio e servirá como um ponto de parada para consultas desnecessárias
    if (isLoadingItems || !page.hasNext) return;

    setIsLoadingItems(true);
    const moreImoveis = await getImoveisByFilterWithPage(
      {...filterValues, ...orderByOptions},
      pageNumber + 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pageNumber += 1;
    setPage(moreImoveis);
    setImoveis((oldState) => [...oldState, ...moreImoveis.data]);
    setIsLoadingItems(false);
  }, [filterValues, isLoadingItems, orderByOptions, page.hasNext]);

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

  useEffect(() => {
    setImoveis(initialPage.data);
  }, [initialPage]);

  return (
    <InfiniteScrollContainer
      id="infiniteScrollContainer"
      onScroll={debounce(scrollEnd(getMoreImoveis), 1000)}
    >
      <ImageList gap={4} style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}>
        {imoveis.map((imovel) => (
          <CardComponent key={imovel.cod_imv} imovel={imovel} />
        ))}
      </ImageList>
      {isLoadingItems && (
        <LoadingBottom>
          <CircularProgress />
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
  z-index: 999;
`;
