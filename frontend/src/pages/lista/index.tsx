import { useEffect, useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import Filter from "../../components/page/lista/Actions/Filter";
import OrderBy from "../../components/page/lista/Actions/OrderBy";
import HeaderLista from "../../components/page/lista/Header";
import ListCards from "../../components/page/lista/ListCards";
import ModalResponsive from "../../components/page/lista/ModalResponsive";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getImoveisByFilterWithPage, getImovelByPage } from "../../lib/imovel";
import {
  FilterValues,
  IImovel,
  OrderByValues,
  Page
} from "../../lib/interfaces";
import {
  LeftSection,
  ListRoot,
  SearchInfo,
  SearchTotal,
  SectionImoveis
} from "./styles";

interface MarketplaceProps {
  pageImoveis: Page<IImovel>;
}

export default function Marketplace({
  pageImoveis: pageImoveisProp,
}: MarketplaceProps) {
  
  const [blockSelect, setBlockSelect] = useState(false);
  const [imoveis, setImoveis] = useState(pageImoveisProp.data);
  const [pageImoveis, setPageImoveis] = useState(pageImoveisProp);
  const [isLoadingItems, setisLoadingItems] = useState(false);
  const [filterValues, setFilterValues] = useState({} as FilterValues);
  const [orderByValues, setOrderByValues] = useState({} as OrderByValues);
  const [page, setPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  const { user } = useAuth();
  const optionsSelect = [
    {
      label: "Procurar",
    },
    {
      label: "Anunciar",
    },
  ];

  const onOrderBy = async (orderByOptions: OrderByValues) => {
    console.log("orderByOptions", orderByOptions);
    setisLoadingItems(true);

    setOrderByValues(orderByOptions);

    const pageImoveis = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByOptions },
      1
    );

    setPage(1);
    setImoveis(pageImoveis.data);
    setPageImoveis(pageImoveis);
    setisLoadingItems(false);
  };

  const onFilter = async (filterValues: FilterValues) => {
    setisLoadingItems(true);

    setFilterValues(filterValues);

    const pageImoveis = await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByValues },
      1
    );

    setPage(1);
    setImoveis(pageImoveis.data);
    setPageImoveis(pageImoveis);
    setisLoadingItems(false);
  };

  function onScrollEnd(e: HTMLElement, func: () => any) {
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
    if (isLoadingItems || !pageImoveis.data.length) return;

    setisLoadingItems(true);
    const moreImoveis = await getImoveisByFilterWithPage(
      filterValues,
      page + 1
    );
    setImoveis((oldState) => [...oldState, ...moreImoveis.data]);
    setPageImoveis(moreImoveis);
    setPage(page + 1);
    setisLoadingItems(false);
  };

  function swapDisplaySelect(e: HTMLElement) {
    const { scrollTop, clientHeight, scrollHeight } = e;

    if (scrollTop >= 150 && !blockSelect) {
      setBlockSelect(true);
    } else if (scrollTop < 150 && blockSelect) {
      setBlockSelect(false);
    }
  }

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
      onScroll={(e) => {
        swapDisplaySelect(e.target as HTMLElement);
        onScrollEnd(e.target as HTMLElement, getMoreImoveis)();
      }}
    >
      <HeaderLista></HeaderLista>
      <SelectOption
        style={
          blockSelect
            ? {
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "2",
                background: "#fff",
              }
            : {
                position: "relative",
              }
        }
        options={optionsSelect}
      />

      <SectionImoveis>
        <LeftSection>
          <SearchInfo>
            <SearchTotal>{pageImoveis.total} imóveis encontrados</SearchTotal>
          </SearchInfo>
          <ModalResponsive
            isMobile={isMobileView}
            buttonContent={<FiFilter size={24} color={"rgba(0, 0, 0, 0.7)"} />}
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
        <ListCards imoveis={imoveis} isLoadingItems={isLoadingItems} />
      </SectionImoveis>
    </ListRoot>
  );
}

export const getStaticProps = async (ctx: any) => {
  const pageImoveis = await getImovelByPage(1);

  return {
    props: {
      pageImoveis,
    },
  };
};
