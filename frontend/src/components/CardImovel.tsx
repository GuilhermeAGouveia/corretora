import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { CardImovelProps, LevelFurnished } from "../lib/interfaces";
import colors from "../styles/colors";
import CardImage from "./CardImage";
import FavoriteButton from "./FavoriteButton";

const CardImovel = ({ imovel }: CardImovelProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingImovelDetails, setIsLoadingImovelDetails] = useState(false);
  const router = useRouter();

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
      {isLoadingImovelDetails && (
        <LoadingImovelDetails
          animate={{
            opacity: [0, 1],
            top: [-300, 0],
            transition: {
              duration: 0.3,
            },
          }}
        >
          <CircularProgress
            sx={{
              color: colors.white,
              fontSize: 20,
            }}
          />
        </LoadingImovelDetails>
      )}
      <CardImovelButtonFavorite
        style={{
          background: isFavorite ? colors.white : "rgba(255, 255, 255, 0.5)",
        }}
      >
        <FavoriteButton
          isFavorite={isFavorite}
          handleFavorite={handleFavorite}
          size={15}
        />
      </CardImovelButtonFavorite>
      <CardImage
        onClick={() => {
          setIsLoadingImovelDetails(true);
          router.push(`imoveis/${imovel.cod_imv}`);
        }}
        imageUrl={
          imovel.images[0]
            ? imovel.images[0].url
            : "https://picsum.photos/200/300"
        }
        alt={(imovel.images?.[0]?.originalname as string) || "Imagem"}
      />

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
  width: 250px;
  float: left;
  min-height: 200px;
  background: white;
  margin: 5px;
  padding-bottom: 10px;
  border-radius: 4px;
  box-shadow: 3px 4px 5px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 1px 4px 13px 0 rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: calc(50% - 10px);
  }
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

const CardImovelButtonFavorite = styled("div")`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingImovelDetails = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;
