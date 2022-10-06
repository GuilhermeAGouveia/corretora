import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBullhorn, FaSortNumericDown } from "react-icons/fa";
import { FiFilter, FiSearch } from "react-icons/fi";
import CardImovel from "../../components/CardImovel";
import Filter from "../../components/Page/lista/Actions/Filter";
import OrderBy from "../../components/Page/lista/Actions/OrderBy";
import ContentControlBySelectionFloatLine from "../../components/Page/lista/ContentControlBySelectionFloatLine";
import HeaderLista from "../../components/Page/lista/Header";
import ListCards from "../../components/Page/lista/ListCards";
import ModalResponsive from "../../components/Page/lista/ModalResponsive";
import { useAuth } from "../../context/Auth";
import { getImoveisByFilterWithPage, getImovelByPage } from "../../lib/imovel";
import {
    FilterValues,
    IImovel,
    OrderByValues,
    Page
} from "../../lib/interfaces";
import {
    AnnounceLineDivision,
    AnounceButton,
    AnounceContent,
    AnounceSection,
    AnounceTitle,
    LeftSection,
    ListRoot,
    SearchInfo,
    SearchSection,
    SearchTotal
} from "../../styles/pages/lista";

interface MarketplaceProps {
  pageImoveis: Page<IImovel>;
}

let pageNumber = 1;
export default function Marketplace({
  pageImoveis: pageImoveisProp,
}: MarketplaceProps) {
  console.log("Marketplace - render");
  const router = useRouter();
  const [blockSelect, setBlockSelect] = useState(false);
  const [imoveis, setImoveis] = useState(pageImoveisProp.data);
  const [isLoadingItems, setisLoadingItems] = useState(false);
  const [pageImoveis, setPageImoveis] = useState(pageImoveisProp);
  const [filterValues, setFilterValues] = useState({} as FilterValues);
  const [orderByValues, setOrderByValues] = useState({} as OrderByValues);
  const [isMobileView, setIsMobileView] = useState(false);

  const { user } = useAuth();

  const onOrderBy = async (orderByOptions: OrderByValues) => {
    console.log("orderByOptions", orderByOptions);
    setisLoadingItems(true);

    setOrderByValues(orderByOptions);

    const pageImoveis = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      1
    );

    pageNumber = 1;
    setImoveis(pageImoveis.data);
    setPageImoveis(pageImoveis);
    setisLoadingItems(false);
  };

  const onFilter = useCallback(
    async (filterValues: FilterValues) => {
      setisLoadingItems(true);

      setFilterValues(filterValues);

      const pageImoveis = await getImoveisByFilterWithPage(
        { ...filterValues, ...orderByValues },
        1
      );

      pageNumber = 1;
      setPageImoveis(pageImoveis);
      setImoveis(pageImoveis.data);
      setisLoadingItems(false);
    },
    [orderByValues]
  );

  function onScrollEnd(e: HTMLElement, func: () => any) {
    console.log("OnScrollEnd");
    return () => {
      const { scrollTop, clientHeight, scrollHeight } = e;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        func();
      }
    };
  }

  const getMoreImoveis = async () => {
    // isLoadingItems é necessário para não carregar mais itens quando o usuário está carregando, evitando dados duplicados
    // !pageImoveis.data é necessário para não carregar mais itens quando a última pagina de dados já foi carregada, assim a
    // próxima terá um data vazio e servirá como um ponto de parada para consultas desnecessárias
    if (isLoadingItems || !pageImoveis.hasNext) return;

    setisLoadingItems(true);
    const moreImoveis = await getImoveisByFilterWithPage(
      filterValues,
      pageNumber + 1
    );
    pageNumber += 1;
    setImoveis((oldState) => [...oldState, ...moreImoveis.data]);
    setisLoadingItems(false);
  };

  // Controla se o SelectFloatLine em ControlContentBySelectionFloatLine deve ser fixo ou relativo na tela
  function swapDisplaySelect(e: HTMLElement) {
    const { scrollTop, clientHeight, scrollHeight } = e;

    if (scrollTop >= 150 && !blockSelect) {
      setBlockSelect(true);
    } else if (scrollTop < 150 && blockSelect) {
      setBlockSelect(false);
    }
  }

  const contentsForContentControl = [
    {
      buttonDisplayContent: {
        label: "Procurar",
        Icon: FiSearch,
      },
      content: (
        <SearchSection>
          <LeftSection>
            <SearchInfo>
              <SearchTotal>{pageImoveis.total} imóveis encontrados</SearchTotal>
            </SearchInfo>
            <ModalResponsive
              isMobile={isMobileView}
              buttonContent={
                <FiFilter size={24} color={"rgba(0, 0, 0, 0.7)"} />
              }
            >
              <Filter onFilter={onFilter} filterValues={filterValues} />
            </ModalResponsive>
            <ModalResponsive
              isMobile={isMobileView}
              buttonContent={
                <FaSortNumericDown size={24} color={"rgba(0, 0, 0, 0.7)"} />
              }
            >
              <OrderBy value={orderByValues} onOrderBy={onOrderBy}></OrderBy>
            </ModalResponsive>
          </LeftSection>
          {useMemo(
            () => (
              <ListCards
                imoveis={imoveis}
                isLoadingItems={isLoadingItems}
                cardComponent={CardImovel}
              />
            ),
            [imoveis, isLoadingItems]
          )}
        </SearchSection>
      ),
    },
    {
      buttonDisplayContent: {
        label: "Anunciar",
        Icon: FaBullhorn,
      },
      content: (
        <AnounceSection>
          <AnounceTitle>Anuncie seus Imóveis por aqui</AnounceTitle>
          <AnounceContent>
            <AnounceButton
              onClick={() => router.push(`/imoveis/cadastrar/CASA`)}
            >
              <span>Casa</span>
            </AnounceButton>
            <AnnounceLineDivision />
            <AnounceButton
              onClick={() => router.push(`/imoveis/cadastrar/COMERCIO`)}
            >
              <span>Comércio</span>
            </AnounceButton>
            <AnnounceLineDivision />
            <AnounceButton
              onClick={() => router.push(`/imoveis/cadastrar/APTO`)}
            >
              <span>Apartamento</span>
            </AnounceButton>
          </AnounceContent>
        </AnounceSection>
      ),
    },
  ];

  useEffect(() => {
    const defineMobileScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
    };

    defineMobileScreen();

    window.addEventListener("resize", defineMobileScreen);
  }, []);

  return (
    <ListRoot
      onScroll={debounce((e) => {
        swapDisplaySelect(e.target as HTMLElement);
        onScrollEnd(e.target as HTMLElement, getMoreImoveis)();
      }, 1000)}
    >
      <HeaderLista></HeaderLista>

      <ContentControlBySelectionFloatLine
        isFixed={blockSelect}
        content={contentsForContentControl}
      />
    </ListRoot>
  );
}

export const getStaticProps = async (ctx: any) => {
  const pageImoveis = await getImovelByPage(1);
  return {
    props: {
      pageImoveis,
    },
    revalidate: 10, // 10 seconds
  };
};
