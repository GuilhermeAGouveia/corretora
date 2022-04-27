import styled from "styled-components";
import { IImovel } from "../../lib/interfaces";
import colors from "../../styles/colors";
import CardImovel from "../CardImovel";

interface ListCardsProps {
    imoveis: IImovel[];
    isLoadingItems: boolean;
}

const ListCards = ({ isLoadingItems, imoveis }: ListCardsProps) => {
    return (

        <CardsContainerRoot>
          {isLoadingItems ? (
            "Loading"
          ) : (
            <CardsContainer>
              {imoveis.map((imovel: IImovel) => (
                <CardImovel key={imovel.cod_imv} imovel={imovel}></CardImovel>
              ))}
            </CardsContainer>
          )}
        </CardsContainerRoot>

    )
}
export default ListCards;


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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;