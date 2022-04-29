import { useEffect, useRef, useState } from "react";
import { FaSortNumericDown } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import styled from "styled-components";
import Filter from "../../components/lista/Actions/Filter";
import OrderBy from "../../components/lista/Actions/OrderBy";
import HeaderLista from "../../components/lista/Header";
import ListCards from "../../components/lista/ListCards";
import ModalResponsive from "../../components/lista/ModalResponsive";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getImoveisByFilterWithPage, getImovelByPage } from "../../lib/imovel";
import {
  FilterValues,
  IImovel,
  OrderByValues,
  Page
} from "../../lib/interfaces";
import colors from "../../styles/colors";

interface MarketplaceProps {
  pageImoveis: Page<IImovel>;
}

export default function Marketplace({ pageImoveis }: MarketplaceProps) {
  const listaRoot = useRef<any>(null);

  const [blockSelect, setBlockSelect] = useState(false);
  const [imoveisState, setImoveisState] = useState(pageImoveis.data);
  const [imoveisSize, setImoveisSize] = useState(pageImoveis.total);
  const [isLoadingItems, setisLoadingItems] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [filterValues, setFilterValues] = useState({} as FilterValues);
  const [orderByValues, setOrderByValues] = useState({} as OrderByValues);
  const [page, setPage] = useState(1);

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
    setImoveisState(pageImoveis.data);
    setImoveisSize(pageImoveis.total);
    setisLoadingItems(false);
  };

  const onFilter = async (filterValues: FilterValues) => {
    setisLoadingItems(true);

    setFilterValues(filterValues);

    const pageImoveis = await await getImoveisByFilterWithPage(
      { ...filterValues, ...orderByValues },
      1
    );

    setPage(1);
    setImoveisState(pageImoveis.data);
    setImoveisSize(pageImoveis.total);
    setisLoadingItems(false);
  };

  async function onScrollEnd() {
    const { scrollTop, clientHeight, scrollHeight } = listaRoot.current;

    // !isLoadingItems é necessário para não carregar mais itens quando o usuário está carregando, evitando dados duplicados
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoadingItems) {
      setisLoadingItems(true);
      const moreImoveis = await getImoveisByFilterWithPage(
        filterValues,
        page + 1
      );
      setImoveisState((oldState) => [...oldState, ...moreImoveis.data]);
      setImoveisSize(moreImoveis.total);
      setPage(page + 1);
      setisLoadingItems(false);
    }
  }

  function swapDisplaySelect(e: any) {
    const { scrollTop, clientHeight, scrollHeight } = listaRoot.current;

    if (scrollTop >= 150 && !blockSelect) {
      setBlockSelect(true);
    } else if (scrollTop < 150 && blockSelect) {
      setBlockSelect(false);
    }
  }

  useEffect(() => {
    const defineMobileScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };

    defineMobileScreen();

    window.addEventListener("resize", defineMobileScreen);
  }, []);

  return (
    <ListRoot
      ref={listaRoot}
      onScroll={(e) => {
        swapDisplaySelect(e);
        onScrollEnd();
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
            <SearchTotal>{imoveisSize} imóveis encontrados</SearchTotal>
          </SearchInfo>
          <ModalResponsive
            isMobile={isMobileDevice}
            buttonContent={<FiFilter size={24} color={"rgba(0, 0, 0, 0.7)"} />}
          >
            <Filter onFilter={onFilter} filterValues={filterValues} />
          </ModalResponsive>
          <ModalResponsive
            isMobile={isMobileDevice}
            buttonContent={
              <FaSortNumericDown size={24} color={"rgba(0, 0, 0, 0.7)"} />
            }
          >
            <OrderBy value={orderByValues} onOrderBy={onOrderBy}></OrderBy>
          </ModalResponsive>
        </LeftSection>
        <ListCards imoveis={imoveisState} isLoadingItems={isLoadingItems} />
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

const ListRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  /**
    As duas linhas acima forçam o scroll neste elemento ao invés de ocorrer no body,
    assim eu consigo determinar o scroll máximo da página que é o scroll do elemento
   */
`;

const SectionImoveis = styled.section`
  position: relative;
  width: 100%;
  min-height: 100%;
  height: auto;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  position: relative;
  width: 210px;
  height: auto;
  padding: 10px;
  display: block;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
  }
`;

const SearchInfo = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
  display: block;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const SearchTotal = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;
