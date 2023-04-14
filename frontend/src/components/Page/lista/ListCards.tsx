import { useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import { AlertType, CardImovelProps, IImovel } from "../../../lib/interfaces";
import api from "../../../services/api";
import colors from "../../../styles/colors";
import BannerInfo, { useBannerInfo } from "../../BannerInfo";

interface ListCardsProps {
  imoveis: any[];
  cardComponent: React.FC<CardImovelProps>;
  isLoading?: boolean;
}

const ListCards = ({
  cardComponent: Card,
  imoveis: imoveisProps,
  isLoading
}: ListCardsProps) => {
  console.log("ListCards - render");
  const [imovelUpdate, setImovelUpdate] = useState<IImovel[] | null>(null);
  const {
    control,
    alertState: [alert, setAlert],
  } = useBannerInfo();
  let imoveis = imovelUpdate || imoveisProps; // se tiver imovelUpdate, usa ele, senão usa imoveisProps

  const handleDelete = async (id: string) => {
    setAlert(undefined);

    const response = await api.delete(`/imovel/${id}`);
    if (response.status !== 200)
      setAlert({
        type: AlertType.ERROR,
        message: "Erro ao deletar imóvel",
      });
    setAlert({
      type: AlertType.SUCCESS,
      message: "Imóvel deletado com sucesso",
    });
    setImovelUpdate(imoveis.filter((imovel) => imovel.cod_imv !== id));
  };

  return (
    <CardsContainerRoot>
      <CardsContainer>
        {imoveis.length ? (
          imoveis.map((imovel: IImovel) => (
            <Card
              key={imovel.cod_imv}
              imovel={imovel}
              onDelete={handleDelete}
            />
          ))
        ) : (!isLoading &&
          <NoneImoveis>Nenhum imóvel encontrado</NoneImoveis>
        )}
      </CardsContainer>

      {alert && (
        <BannerInfo control={control} type={alert.type}>
          {alert.message}
        </BannerInfo>
      )}
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
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
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
