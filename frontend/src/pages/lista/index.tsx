import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import CardImovel from "../../components/CardImovel";
import Filter from "../../components/Page/lista/Actions/Filter";
import OrderBy from "../../components/Page/lista/Actions/OrderBy";
import ShowConfigs from "../../components/Page/lista/Actions/ShowListConfigs";
import ContentControlBySelectionFloatLine from "../../components/Page/lista/ContentControlBySelectionFloatLine";
import InfiniteScrollList from "../../components/Page/lista/InfiniteScrollList";
import ModalResponsive from "../../components/Page/lista/ModalResponsive";
import PageButtonList from "../../components/Page/lista/PageButtonList";
import TopBar from "../../components/TopBar";
import { useAuth } from "../../context/Auth";
import { useListConfigs } from "../../context/ListSettings";
import { getImoveisByFilterWithPage, getImovelByPage } from "../../lib/imovel";
import {
  FilterValues,
  IImovel,
  OrderByValues,
  Page,
} from "../../lib/interfaces";
import {
  AnnounceLineDivision,
  AnounceButton,
  AnounceContent,
  AnounceSection,
  AnounceTitle,
  LeftSection,
  ListRoot,
  NotResultContainer,
  SearchInfo,
  SearchSection,
  SearchTotal,
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
  const [isLoadingItems, setisLoadingItems] = useState(false);
  const [pageImoveis, setPageImoveis] = useState(pageImoveisProp);
  const [filterValues, setFilterValues] = useState({} as FilterValues);
  const [orderByValues, setOrderByValues] = useState({} as OrderByValues);
  const [isMobileView, setIsMobileView] = useState(false);
  const [ListComponent, setListComponent] = useState<JSX.Element>(<></>);

  const { user } = useAuth();
  const { configs } = useListConfigs();

  useEffect(() => console.log(configs), [configs])

  useEffect(() => {
    const listProps = {
      cardComponent: CardImovel,
      initialPage: pageImoveis,
      filterValues: filterValues,
      orderByOptions: orderByValues,
      isLoadingInitialData: isLoadingItems,
    };
    if (configs?.listType === "page") {
      setListComponent(<PageButtonList {...listProps} />);
    } else {
      setListComponent(<InfiniteScrollList {...listProps} />);
    }
  }, [
    configs?.listType,
    pageImoveis,
    filterValues,
    orderByValues,
    isLoadingItems,
  ]);

  const onOrderBy = async (orderByOptions: OrderByValues) => {
    console.log("orderByOptions", orderByOptions);
    setisLoadingItems(true);

    setOrderByValues(orderByOptions);

    const pageImoveis = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      1
    );

    pageNumber = 1;
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
      setisLoadingItems(false);
    },
    [orderByValues]
  );

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
        Icon: SearchOutlinedIcon,
      },
      content: (
        <SearchSection>
          <LeftSection>
            <SearchInfo>
              <SearchTotal>{pageImoveis.total} imóveis encontrados</SearchTotal>
            </SearchInfo>
            <ModalResponsive
              title="Filtros"
              isPrimary
              isMobile={isMobileView}
              buttonContent={
                <FilterListOutlinedIcon
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "24px",
                  }}
                />
              }
            >
              <Filter onFilter={onFilter} filterValues={filterValues} />
            </ModalResponsive>
            <ModalResponsive
              title="Ordenar"
              isMobile={isMobileView}
              buttonContent={
                <SortByAlphaOutlinedIcon
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "24px",
                  }}
                />
              }
            >
              <OrderBy value={orderByValues} onOrderBy={onOrderBy}></OrderBy>
            </ModalResponsive>
            <ModalResponsive
              title="Configurações de exibição"
              isPrimary
              isMobile={isMobileView}
              buttonContent={
                <AutoAwesomeMosaicIcon
                  sx={{
                    color: "rgba(0, 0, 0, 0.7)",
                    fontSize: "24px",
                  }}
                />
              }
            >
              <ShowConfigs></ShowConfigs>
            </ModalResponsive>
          </LeftSection>
          {pageImoveis.data.length && ListComponent}
          {!pageImoveis.data.length && !isLoadingItems && <NotResultContainer>Não tenho nada para mostrar 😔</NotResultContainer>}
                     
        </SearchSection>
      ),
    },
    {
      buttonDisplayContent: {
        label: "Anunciar",
        Icon: AddHomeWorkOutlinedIcon,
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
        id="listRoot"
        onScroll={debounce((e) => {
          swapDisplaySelect(e.target as HTMLElement);
        }, 1000)}
      >
        <TopBar pageName="Pagina Inicial"></TopBar>

        <ContentControlBySelectionFloatLine
          initialSelected={0}
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
