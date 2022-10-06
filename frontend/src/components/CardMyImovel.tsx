import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FiMapPin } from "react-icons/fi";
import styled from "styled-components";
import { CardImovelProps } from "../lib/interfaces";
import colors from "../styles/colors";
import CardImage from "./CardImage";
import MenuImovelActions from "./MenuImovelActions";

export default function CardMyImovel({ imovel, onDelete }: CardImovelProps) {
  const getStringDateFormat = (date: Date) => {
    return format(date, "dd 'de' MMMM', às ' HH:mm'h'", {
      locale: ptBR,
    });
  };

  function captalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <Card>
      <CardImage
        imageUrl={
          imovel.images[0]
            ? imovel.images[0].url
            : "https://picsum.photos/200/300"
        }
        alt={(imovel.images?.[0]?.originalname as string) && "Imagem"}
      />
      <LineDivider />
      <CardDescription>
        <CardDescriptionHeader>
          <CardTitle>
            <h4>
              {captalize(imovel.type)} em {imovel.city}, {imovel.state}
            </h4>
          </CardTitle>
          <CardCreatedAt>
            <time dateTime={new Date(imovel.createdAt).toDateString()}>
              {`${getStringDateFormat(new Date(imovel.createdAt))}`}
            </time>
          </CardCreatedAt>
          <MenuImovelActions onDelete={onDelete} imovelId={imovel.cod_imv} />
        </CardDescriptionHeader>
        <address>
          <FiMapPin size={14} color={colors.primary} /> {imovel.address},{" "}
          {imovel.district}
        </address>
        <div>{imovel.area}</div>
        <div>{imovel.hasGarage}</div>
        <div>{imovel.hasSuite}</div>
        <div>{imovel.hasGarden}</div>
        <div>{imovel.nBathrooms}</div>
        <div>{imovel.nRooms}</div>
        <div>{imovel.mensalidade}</div>
        <div>{imovel.price}</div>
      </CardDescription>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  margin: 0.8rem 0.5rem;
  height: 300px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const LineDivider = styled.div`
  position: relative;
  width: 1px;
  height: 100%;
  background: ${colors.primary};

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardDescription = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  padding: 5px;
`;

const CardTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CardDescriptionHeader = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CardCreatedAt = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-size: 14px;
  padding-right: 10px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    font-size: 12px;
  }
`;
