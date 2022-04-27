import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Filter from "../../components/lista/Filter";
import ListCards from "../../components/lista/ListCards";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getAllImovel } from "../../lib/imovel";
import { IImovel } from "../../lib/interfaces";
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

  const { user } = useAuth();
  const optionsSelect = [
    {
      label: "Alugar",
    },
    {
      label: "Comprar",
    },
    {
      label: "Vender",
    },
  ];

  const onFilter = async (data: any) => {
    setisLoadingItems(true);

    var path = "/imovel/filter?";

    const builderQuery = {
      type: (type?: string) =>
        !!type ? path.concat(`type=${type}&`) : path,
      mensalidade: ({ min, max }: any) => {
        min = !!min ? min : 0
        max = !!max ? max : Number.POSITIVE_INFINITY
        return path.concat(`mensalidade=${min}-${max}&`)
      },
      price: ({ min, max }: any) => {
        min = !!min ? min : 0
        max = !!max ? max : Number.POSITIVE_INFINITY
        return path.concat(`price=${min}-${max}&`)
      },
    };

    const { type, mensalidadeMax, mensalidadeMin } = data;

    path = builderQuery.type(type);
    path = builderQuery.mensalidade({
      min: mensalidadeMin,
      max: mensalidadeMax,
    });

    path = builderQuery.price({
      min: data.priceMin,
      max: data.priceMax,
    });



    

    const { data: imoveis } = await api.get(path);
    setImoveisState(imoveis);
    setisLoadingItems(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      const scrollTop = window.scrollY;

      if (scrollTop >= 100 && !blockSelect) {
        setBlockSelect(true);
      } else if (scrollTop < 100 && blockSelect) {
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
        <Filter onFilter={onFilter} />
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
`;
