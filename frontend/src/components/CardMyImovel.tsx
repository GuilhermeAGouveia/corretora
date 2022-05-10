import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import styled from "styled-components";
import { IImovel } from "../lib/interfaces";
import colors from "../styles/colors";

export function CardMyImovel({ imovel }: { imovel: IImovel }) {
  const getStringDateFormat = (date: Date) => {
    return format(date, "dd 'de' MMMM', às ' HH:mm'h'", {
        locale: ptBR,
    });
  };

  return (
    <Card>
      <CardImage
        src={
          imovel.images[0]
            ? imovel.images[0].url
            : "https://picsum.photos/200/300"
        }
        alt={imovel.images[0] ? imovel.images[0].originalname : "Imagem"}
        width={300}
        height={300}
        objectFit="cover"
        priority
        quality={100}
      />
      <LineDivider />
      <CardDescription>
        {`criado em ${getStringDateFormat(new Date(imovel.createdAt))}`}
      </CardDescription>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px;
  background: red;
`;

const CardImage = styled(Image)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LineDivider = styled.div`
  position: relative;
  width: 1px;
  height: 100%;
  background: ${colors.primary};
  margin: 0 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CardDescription = styled.div`
  position: relative;
  width: 100%;
  background: blue;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
