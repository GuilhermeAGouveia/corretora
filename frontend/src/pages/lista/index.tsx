import { AnimatePresence, motion } from "framer-motion";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiFilter } from 'react-icons/fi';
import styled from "styled-components";
import Filter from "../../components/lista/Filter";
import ListCards from "../../components/lista/ListCards";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getAllImovel } from "../../lib/imovel";
import { FilterValues, IImovel } from "../../lib/interfaces";
import { FilterQueryBuilder } from "../../lib/queryBuilder";
import api from "../../services/api";
import colors from "../../styles/colors";

interface MarketplaceProps {
  imoveis: IImovel[];
}

export default function Marketplace({ imoveis }: MarketplaceProps) {
  const { register, handleSubmit } = useForm();

  const [blockSelect, setBlockSelect] = useState(false);
  const [imoveisState, setImoveisState] = useState(imoveis);
  const [isLoadingItems, setisLoadingItems] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [filterValues, setFilterValues] = useState({} as FilterValues);

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
    
    const {
      type,
      mensalidadeMax,
      mensalidadeMin,
      offerType,
      priceMin,
      priceMax,
    } = data;



    const queryBuilder = new FilterQueryBuilder("/imovel/filter");

    queryBuilder.type(type);
    queryBuilder.offerType(offerType);
    queryBuilder.mensalidade({ min: mensalidadeMin, max: mensalidadeMax });
    queryBuilder.price({ min: priceMin, max: priceMax });

    const { data: imoveis } = await api.get(queryBuilder.getQuery());
    setImoveisState(imoveis);
    setisLoadingItems(false);
  };

  useEffect(() => {
    const defineMobileScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    }

    defineMobileScreen();

    window.addEventListener("resize", defineMobileScreen);
    
    window.addEventListener("scroll", function (e) {
      const scrollTop = window.scrollY;

      if (scrollTop >= 150 && !blockSelect) {
        setBlockSelect(true);
      } else if (scrollTop < 150 && blockSelect) {
        setBlockSelect(false);
      }
    });
  }, [blockSelect]);
  return (
    <div>
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
            <SearchTotal>{imoveisState.length} imóveis encontrados</SearchTotal>
            {isMobileDevice && (
              <FilterDisplayButton
                onClick={() => setShowMobileFilter((oldState) => !oldState)}
              >
                <FiFilter size={24} color={'rgba(0, 0, 0, 0.7)'}/>
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
                <Filter onFilter={onFilter} filterValues={filterValues}/>
              </FilterContainer>
            )}
          </AnimatePresence>
        </LeftSection>
        <ListCards imoveis={imoveisState} isLoadingItems={isLoadingItems} />
      </SectionImoveis>
    </div>
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

  const imoveis = await getAllImovel(ctx);

  return {
    props: {
      imoveis,
    },
  };
};

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
