import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import { CardImovelProps, LevelFurnished } from "../lib/interfaces";
import colors from "../styles/colors";
import CardImage from "./CardImage";
import { uniqueId } from "lodash";

const CardImovel = ({ imovel }: CardImovelProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHover, setIsHover] = useState(false);
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
      <CardImovelButtonFavorite
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={handleFavorite}
        style={{
          background:
            isFavorite || isHover ? colors.white : "rgba(255, 255, 255, 0.5)",
        }}
      >
        <AnimatePresence>
          {(isFavorite || isHover) && (
            <IconHeart
              initial={{ width: 0, height: 0 }}
              animate={{ width: 20, height: 20 }}
              exit={{ width: 0, height: 0 }}
            >
              <FaHeart key={uniqueId()} size={15} color={colors.primary} />
            </IconHeart>
          )}
          <FaRegHeart
            key={uniqueId()}
            style={{ position: "absolute" }}
            size={15}
            color={"rgba(0, 0, 0, 0.2)"}
          />
        </AnimatePresence>
      </CardImovelButtonFavorite>
      <CardImage
        onClick={() => router.push(`imoveis/${imovel.cod_imv}`)}
        imageUrl={
          imovel.images[0]
            ? imovel.images[0].url
            : "https://picsum.photos/200/300"
        }
        alt={(imovel.images?.[0]?.originalname as string) && "Imagem"}
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

const CardImovelButtonFavorite = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
  border: none;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconHeart = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
