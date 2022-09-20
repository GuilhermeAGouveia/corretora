import styled from "styled-components";
import {AlertType, CardImovelProps, IImovel} from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import {useEffect, useState} from "react";
import api from "../../../services/api";
import BannerInfo, {useBannerInfo} from "../../BannerInfo";

interface ListCardsProps {
    imoveis: IImovel[];
    isLoadingItems?: boolean;
    cardComponent: React.ComponentType<CardImovelProps>;
}


const ListCards = ({cardComponent: Card, isLoadingItems, imoveis}: ListCardsProps) => {
    const [imovelUpdate, setImovelUpdate] = useState<IImovel[] | null>(null);
    const {control, "alertState": [alert, setAlert]} = useBannerInfo();

    const handleDelete = async (id: string) => {
        setAlert(undefined);

        const response = await api.delete(`/imovel/${id}`)
        if (response.status !== 200)
            setAlert({
                type: AlertType.ERROR,
                message: "Erro ao deletar imóvel",
            })
        setAlert({
            type: AlertType.SUCCESS,
            message: "Imóvel deletado com sucesso",
        })
        setImovelUpdate(oldImoveis => (oldImoveis || imoveis).filter(imovel => imovel.cod_imv !== id));

    }

    useEffect(() => console.log("imovelUpdate", imovelUpdate), [imovelUpdate])

    return (
        <CardsContainerRoot>
            <CardsContainer>
                {imoveis.length ? (
                    (imovelUpdate || imoveis).map((imovel: IImovel) => (

                        <Card key={imovel.cod_imv} imovel={imovel} onDelete={handleDelete}/>
                    ))
                ) : (
                    <NoneImoveis>Nenhum imóvel encontrado</NoneImoveis>
                )}
            </CardsContainer>

            {isLoadingItems && <LoadingBottom>Loading More ...</LoadingBottom>}
            {alert && <BannerInfo control={control} type={alert.type}>{alert.message}</BannerInfo>}


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
