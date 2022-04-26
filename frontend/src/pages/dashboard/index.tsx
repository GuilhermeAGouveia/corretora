import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardImovel from "../../components/CardImovel";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";
import { getAllImovel } from "../../lib/imovel";
import { IImovel } from "../../lib/interfaces";
import colors from "../../styles/colors";

interface MarketplaceProps {
  imoveis: IImovel[];
}

export default function Marketplace({ imoveis }: MarketplaceProps) {
  const [blockSelect, setBlockSelect] = useState(false);

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
      <CardsContainerRoot>
        <CardsContainer>
          {imoveis.map((imovel: IImovel) => (
            <CardImovel key={imovel.cod_imv} imovel={imovel}></CardImovel>
          ))}
        </CardsContainer>
      </CardsContainerRoot>
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
  console.log(imoveis);
  return {
    props: {
      imoveis,
    },
  };
};

const CardsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
  margin: 0 5%;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const CardsContainerRoot = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
