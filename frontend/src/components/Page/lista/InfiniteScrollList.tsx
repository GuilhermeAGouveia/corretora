import { CircularProgress, List } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { getImoveisByFilterWithPage } from "../../../lib/imovel";
import { IImovel, Page } from "../../../lib/interfaces";
import {
  ListContainer,
  LoadingBottomContainer,
} from "../../../styles/pages/lista";
import ListComponent from "./IListComponent";

let pageNumber = 1;

export default function InfiniteScrollList({
  initialPage,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData,
}: ListComponent) {
  const { isMobileView } = useDeviceDetect();
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [page, setPage] = useState<Page<IImovel>>(initialPage);
  const [imoveis, setImoveis] = useState<IImovel[]>(initialPage.data);
  const getMoreImoveis = async () => {
    // isLoadingItems é necessário para não carregar mais itens quando o usuário está carregando, evitando dados duplicados
    // !pageImoveis.data é necessário para não carregar mais itens quando a última pagina de dados já foi carregada, assim a
    // próxima terá um data vazio e servirá como um ponto de parada para consultas desnecessárias
    if (isLoadingItems || !page.hasNext) return;
    console.log("pageNumber", pageNumber);
    setIsLoadingItems(true);
    const moreImoveis = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      pageNumber + 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pageNumber += 1;
    setPage(moreImoveis);
    setImoveis((oldState) => [...oldState, ...moreImoveis.data]);
    setIsLoadingItems(false);
  };

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

  useEffect(() => {
    console.log(imoveis);
  }, [imoveis]);

  return (
    <ListContainer
      isMobile={isMobileView}
      id="infiniteScrollContainer"
      onScroll={debounce(scrollEnd(getMoreImoveis), 1000)}
    >
      <List
        style={{
          padding: "10px 20px",
        }}
      >
        {imoveis.map((imovel) => (
          <CardComponent key={imovel.cod_imv} imovel={imovel} />
        ))}
      </List>
      {isLoadingItems && (
        <LoadingBottomContainer>
          <CircularProgress size={'30px'}/>
        </LoadingBottomContainer>
      )}
    </ListContainer>
  );
}
