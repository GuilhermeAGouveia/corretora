import { AnimatePresence, motion } from "framer-motion";
import { parseCookies } from "nookies";
import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import styled from "styled-components";
import Filter from "../../components/lista/Filter";
import ListCards from "../../components/lista/ListCards";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getImoveisByFilterWithPage, getImovelByPage } from "../../lib/imovel";
import { FilterValues, IImovel, Page } from "../../lib/interfaces";
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
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [filterValues, setFilterValues] = useState({} as FilterValues);
  const [page, setPage] = useState(1);



  const { user } = useAuth();
  const optionsSelect = [
    {
      label: "Procurar",
    },
    {
      label: "Vender",
    },
  ];

  const onFilter = async (data: FilterValues) => {
    setisLoadingItems(true);

    setFilterValues(data);

    const pageImoveis = await getImoveisByFilterWithPage(data, 1);
    
    setPage(1);
    setImoveisState(pageImoveis.data);
    setImoveisSize(pageImoveis.total);
    setisLoadingItems(false);
  };

  async function onScrollEnd() {
    const { scrollTop, clientHeight, scrollHeight } = listaRoot.current;

    if (scrollTop + clientHeight === scrollHeight) {
      
      const moreImoveis = await getImoveisByFilterWithPage(filterValues, page + 1);
      setImoveisState(oldState => [...oldState, ...moreImoveis.data]);
      setImoveisSize(moreImoveis.total);
      setPage(page + 1);
      console.log(page)
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
      <Header>
        <Salutation>
          <h1>Bem vindo, {user?.firstName}</h1>
        </Salutation>
      </Header>
      <SelectOption
        style={
          blockSelect
            ? {
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "1",
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
            {isMobileDevice && (
              <FilterDisplayButton
                onClick={() => setShowMobileFilter((oldState) => !oldState)}
              >
                <FiFilter size={24} color={"rgba(0, 0, 0, 0.7)"} />
              </FilterDisplayButton>
            )}
          </SearchInfo>
          <AnimatePresence>
            {(!isMobileDevice || showMobileFilter) && (
              <FilterContainer
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
              >
                <Filter onFilter={onFilter} filterValues={filterValues} />
              </FilterContainer>
            )}
          </AnimatePresence>
        </LeftSection>
        <ListCards imoveis={imoveisState} isLoadingItems={isLoadingItems} />
      </SectionImoveis>
    </ListRoot>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const token = parseCookies(ctx)["@corretora:token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

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

const Header = styled.header`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Salutation = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.secondary};
  display: flex;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.primary};
  justify-content: center;
  align-items: flex-start;
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
  }
`;

const LeftSection = styled.div`
  position: relative;
  width: 210px;
  height: auto;
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInfo = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
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

const FilterContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    position: absolute;
    width: 95%;
    top: auto;
    left: 2.5%;
    z-index: 2;
    border-radius: 5px;
    background: white;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

    &:before {
      content: "";
      position: absolute;
      top: -5px;
      right: 10px;
      width: 10px;

      height: 10px;
      transform: rotate(45deg);
      background: white;
    }
  }
`;

const FilterDisplayButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  width: 30px;
  height: 30px;
  border: none;
`;
