import styled from "styled-components";
import {CardImovelProps, IImovel} from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import {useState} from "react";
import api from "../../../services/api";
import BannerInfo from "../../BannerInfo";

interface ListCardsProps {
    imoveis: IImovel[];
    isLoadingItems?: boolean;
    cardComponent: React.ComponentType<CardImovelProps>;
}


const ListCards = ({cardComponent: Card, isLoadingItems, imoveis}: ListCardsProps) => {
    const [imovelUpdate, setImovelUpdate] = useState<IImovel[]>(imoveis);
    const [error, setError] = useState<boolean>();
    const [success, setSuccess] = useState<boolean>();


    const handleDelete = async (id: string) => {
        setError(false);
        setSuccess(false);

        const response = await api.delete(`/imovel/${id}`)
        if (response.status !== 200)
            setError(true);

        setSuccess(true);
        setImovelUpdate(oldImoveis => oldImoveis.filter(imovel => imovel.cod_imv !== id));

    }


    return (
        <CardsContainerRoot>
            <CardsContainer>
                {imovelUpdate.length ? (
                    imovelUpdate.map((imovel: IImovel) => (

                        <Card key={imovel.cod_imv} imovel={imovel} onDelete={handleDelete}/>
                    ))
                ) : (
                    <NoneImoveis>Nenhum imóvel encontrado</NoneImoveis>
                )}
            </CardsContainer>

            {isLoadingItems && <LoadingBottom>Loading More ...</LoadingBottom>}
            {error && <BannerInfo type={"error"}>Erro ao deletar imóvel!</BannerInfo>}
            {success && <BannerInfo type={"success"}>Imóvel deletado com sucesso!</BannerInfo>}

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
