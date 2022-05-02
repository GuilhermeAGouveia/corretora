import styled from "styled-components";
import { IImovel } from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import CardImovel from "../../CardImovel";

interface ListCardsProps {
  imoveis: IImovel[];
  isLoadingItems: boolean;
}

const ListCards = ({ isLoadingItems, imoveis }: ListCardsProps) => {
  return (
    <CardsContainerRoot>
      <CardsContainer>
        {imoveis.length ? (
          imoveis.map((imovel: IImovel) => (
            <CardImovel key={imovel.cod_imv} imovel={imovel} />
          ))
        ) : (
          <NoneImoveis>Nenhum imóvel encontrado</NoneImoveis>
        )}
      </CardsContainer>

      {isLoadingItems && <LoadingBottom>Loading More ...</LoadingBottom>}
    </CardsContainerRoot>
  );
};
export default ListCards;

const CardsContainer = styled.div`
  position: relative;
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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const LoadingBottom = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoneImoveis = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;
