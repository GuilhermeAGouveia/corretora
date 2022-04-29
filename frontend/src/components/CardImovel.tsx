import Image from "next/image";
import styled from "styled-components";
import { IImovel, LevelFurnished } from "../lib/interfaces";
import colors from "../styles/colors";

interface CardImovelProps {
  imovel: IImovel;
}

const CardImovel = ({ imovel }: CardImovelProps) => {
  const getPlural = (num: number, word: string) => {
    return (
      <>
        <span>{num}</span>
        <span>{num > 1 ? word + "s" : word}</span>
      </>
    );
  };
  return (
    <CardImovelContainer>
      <CardImovelImage>
        <Image
          src={
            imovel.images[0]
              ? imovel.images[0].url
              : "https://picsum.photos/200/300"
          }
          alt={imovel.images[0] ? imovel.images[0].originalname : "Imagem"}
          layout="fill"
          blurDataURL="https://picsum.photos/200/300"
          priority
        />
      </CardImovelImage>

      <LineDivider />
      <CardDescription>
        <CardImovelPrice>
          <span>R$</span>{" "}
          {new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(
            imovel.price || 0
          )}{" "}
          <span>/ mês</span>
        </CardImovelPrice>

        <ImovelLocation>
          {imovel.city}, {imovel.state}
        </ImovelLocation>
        <LineDivider />
        <CardLabelContainer>
          <CardLabel>{imovel.type}</CardLabel>
          {!!imovel.nBathrooms && (
            <CardLabel>{getPlural(imovel.nBathrooms, "banheiro")}</CardLabel>
          )}
          {!!imovel.nRooms && (
            <CardLabel>{getPlural(imovel.nRooms, "quarto")}</CardLabel>
          )}
          {!(imovel.isFurnished == LevelFurnished.NONE) && (
            <CardLabel>
              <span>
                {imovel.isFurnished == LevelFurnished.SEMI && "Parcialmente "}
              </span>
              <span>mobiliado</span>
            </CardLabel>
          )}
        </CardLabelContainer>
      </CardDescription>
    </CardImovelContainer>
  );
};

export default CardImovel;

const CardImovelContainer = styled("div")`
  position: relative;
  float: left;
  width: 250px;
  min-height: 200px;
  background: white;
  margin: 5px;
  padding-bottom: 10px;
  border-radius: 4px;
  box-shadow: 1px 4px 13px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 1px 4px 13px 0 rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 50vw;
    margin: 0;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0;
  }
`;

const CardImovelImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const CardDescription = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  padding: 10px;
  padding-top: 0;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
`;

const ImovelLocation = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: ${colors.secondary};
`;

const CardImovelPrice = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1.3em;
  font-weight: 500;

  span:last-child {
    position: absolute;
    font-size: 0.7rem;
    padding-left: 5px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
    top: 1px;
  }
`;

const LineDivider = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const CardLabel = styled.div`
  position: relative;
  padding: 3px 5px;
  border-radius: 10px;
  float: left;
  font-size: 9px;
  max-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondary};
  margin: 1px;
  font-weight: bold;
  color: white;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
  text-transform: lowercase;

  span {
    margin-left: 2px;
  }
`;

const CardLabelContainer = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
 

  align-items: center;
`;
