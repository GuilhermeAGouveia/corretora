import Image from "next/image";
import styled from "styled-components";
import { IImovel } from "../lib/interfaces";
import colors from "../styles/colors";

interface CardImovelProps {
  imovel: IImovel;
}

const CardImovel = ({ imovel }: CardImovelProps) => {
  return (
    <CardImovelContainer>
      <CardImovelImage>
        <Image
          src={imovel.images[0] ? imovel.images[0].url : "https://picsum.photos/200/300"}
          alt={imovel.images[0] ? imovel.images[0].originalname : "genericAlt"}
          layout="fill"
          blurDataURL="https://picsum.photos/200/300"
          priority
        />
      </CardImovelImage>
      <CardDescription>
        <CardTitle>{imovel.type}</CardTitle>
        <ImovelLocation>{imovel.city}, {imovel.state}</ImovelLocation>
        <CardImovelPrice>
            {new Intl.NumberFormat( 'pt-BR', {style: 'currency', currency: 'BRL'}).format(imovel.price || 0)} / mês
        </CardImovelPrice>
            
      </CardDescription>
    </CardImovelContainer>
  );
};

export default CardImovel;

const CardImovelContainer = styled.div`
  position: relative;
  min-width: 150px;
  max-width: 200px;
  min-height: 150px;
  background: ${colors.white};
  margin: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
`;
const CardTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Montserrat", sans-serif;
  text-transform: capitalize;
  font-size: 14px;

  font-weight: bold;
  color: ${colors.secondary};
`;

const ImovelLocation = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: ${colors.secondary};
`;

const CardImovelPrice = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: ${colors.secondary};
`;