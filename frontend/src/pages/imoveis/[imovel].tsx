import { Close, MoreVert } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RoomIcon from "@mui/icons-material/Room";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { capitalize } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import avatarPNG from "../../assets/images/avatar.png";
import casaPNG from "../../assets/images/casa.png";
import TopBar from "../../components/TopBar";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { getAllImovel, getImovelByCod } from "../../lib/imovel";
import { IImovel, Locador } from "../../lib/interfaces";
import { getLocadorByCod } from "../../lib/pessoa";
import colors from "../../styles/colors";

export const getStaticPaths: GetStaticPaths = async () => {
  const getImovelSlugs = (await getAllImovel())?.map((item) => ({
    params: { imovel: item.cod_imv },
  }));

  return {
    paths: getImovelSlugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const imovel = await getImovelByCod(ctx.params?.imovel as string, ctx);
  const locador = await getLocadorByCod(imovel?.cod_lcd as string, ctx);
  return {
    props: {
      imovel,
      locador,
    },
    revalidate: 3600, // 1 hour
  };
};

interface ImovelProps {
  imovel: IImovel | null | undefined;
  locador: Locador | null | undefined;
}

export default function Imovel({ imovel, locador }: ImovelProps) {
  const [imageSelected, setImageSelected] = useState("");
  const { isMobileView } = useDeviceDetect();
  return (
    <ImovelDetailContainer>
      <TopBar pageName="Detalhes do Imóvel" />
      <FullScreenBox>
        <TopContainer>
          <PropietarioContainer>
            <PropietarioAvatar>
              <Image src={avatarPNG} alt="Avatar" width={25} />
            </PropietarioAvatar>
            <PropietarioInfo>
              <Typography
                fontSize={"small"}
                fontFamily={"Lato, sans-serif"}
                lineHeight={"10px"}
              >
                Anunciado por
              </Typography>
              <Typography
                fontSize={"medium"}
                fontFamily={"Lato, sans-serif"}
                fontWeight={"bold"}
                color={colors.primary}
              >
                {locador?.firstName} {locador?.lastName}
              </Typography>
            </PropietarioInfo>
          </PropietarioContainer>
          <ActionsContainer>
            <FavoriteBorderIcon
              sx={{
                color: colors.primary,
                fontSize: 20,
              }}
            />
            <MoreVert
              sx={{
                color: colors.primary,
                fontSize: 20,
              }}
            />
          </ActionsContainer>
        </TopContainer>
        <BodyContainer isMobile={isMobileView}>
          <ImageContainer>
            <MainImageContainer>
              <Image
                src={casaPNG}
                alt="Casa"
                style={{
                  objectFit: "cover",
                }}
              />
            </MainImageContainer>
            <ImageSelectorContainer>
              <ImageSelector
                layoutId="image1"
                onClick={() => setImageSelected("image1")}
              >
                <Image src={casaPNG} alt="Casa" width={50} />
              </ImageSelector>
              <ImageSelector
                layoutId="image2"
                onClick={() => setImageSelected("image2")}
              >
                <Image src={casaPNG} alt="Casa" width={50} />
              </ImageSelector>
              <ImageSelector
                layoutId="image3"
                onClick={() => setImageSelected("image3")}
              >
                <Image src={casaPNG} alt="Casa" width={50} />
              </ImageSelector>
              <ImageSelector
                layoutId="image4"
                onClick={() => setImageSelected("image4")}
              >
                <Image src={casaPNG} alt="Casa" width={50} />
              </ImageSelector>
            </ImageSelectorContainer>
            <AnimatePresence>
              {imageSelected && (
                <FocusImage layoutId={imageSelected}>
                  <CloseImageButton onClick={() => setImageSelected("")}>
                    <Close
                      sx={{
                        color: colors.primary,
                        fontSize: 20,
                      }}
                    />
                  </CloseImageButton>
                  <Image
                    src={casaPNG}
                    alt="Casa"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </FocusImage>
              )}
            </AnimatePresence>
          </ImageContainer>
          <ImovelDescriptionContainer isMobile={isMobileView}>
            <ImovelTittleContainer>
              <Typography
                fontSize={"large"}
                fontFamily={"Lato, sans-serif"}
                fontWeight={"bold"}
                color={colors.primary}
                sx={{
                  width: "30%",
                  marginRight: "10px",
                }}
              >
                {capitalize(imovel?.type as string)} em
              </Typography>
              <LocalContainer>
              <RoomIcon
                  sx={{
                    color: colors.primary,
                    fontSize: 20,
                  }}
                />
                <Typography
                  fontSize={"small"}
                  sx={{
                    position: "relative",
                    fontWeight: 500,
                    color: "#343434",
                  }}
                >
                  {imovel?.address}, {imovel?.city}, {imovel?.state}
                </Typography>
              
              </LocalContainer>
            </ImovelTittleContainer>
            <ImovelDescriptionTextContainer>
              <Typography
                fontFamily={"Lato, sans-serif"}
                fontWeight={300}
                fontSize={18}
              >
                Casa com 3 quartos, 2 banheiros, 1 vaga de garagem, 1 cozinha, 1
              </Typography>
            </ImovelDescriptionTextContainer>
          </ImovelDescriptionContainer>

          <ButtonsImovelContainer isMobile={isMobileView}>
            <ButtonImovel>
              <Typography
                fontFamily={"Lato, sans-serif"}
                fontWeight={300}
                fontSize={24}
              >
                R$ {imovel?.mensalidade}
              </Typography>
              <Typography
                fontFamily={"Lato, sans-serif"}
                fontWeight={600}
                fontSize={18}
              >
                Aluguel
              </Typography>
            </ButtonImovel>
            <ButtonImovel
              style={{
                backgroundColor: "white",
                color: colors.primary,
              }}
            >
              <Typography
                fontFamily={"Lato, sans-serif"}
                fontWeight={300}
                fontSize={24}
              >
                R$ {imovel?.price}
              </Typography>
              <Typography
                fontFamily={"Lato, sans-serif"}
                fontWeight={600}
                fontSize={18}
              >
                Comprar
              </Typography>
            </ButtonImovel>{" "}
          </ButtonsImovelContainer>
        </BodyContainer>
      </FullScreenBox>
    </ImovelDetailContainer>
  );
}

const ImovelDetailContainer = styled.div`
  position: relative;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 7.5px 10px;
`;

const PropietarioContainer = styled.div`
  position: relative;
  display: flex;
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const PropietarioAvatar = styled.div`
  position: relative;
  display: flex;
  min-height: 35px;
  min-width: 35px;
  border-radius: 50%;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PropietarioInfo = styled.div`
  position: relative;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const ActionsContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 60%;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
  height: 40%;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const MainImageContainer = styled("div")`
  position: relative;
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImageSelectorContainer = styled.div`
  position: relative;
  display: flex;
  height: 20%;
  padding: 10px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  overflow: hidden;
`;

const ImageSelector = styled(motion.div)`
  position: relative;
  display: flex;
  height: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 2px;
`;

const FocusImage = styled(motion.div)`
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.95);
  overflow: hidden;
  inset: 0;
  z-index: 2;
`;

const CloseImageButton = styled.button`
  position: absolute;
  display: flex;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 50%;
  background-color: ${colors.secondary};
  color: ${colors.white};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  top: 10px;
  right: 10px;
`;

const ButtonImovel = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 180px;
  border: none;
  border-radius: 5px;
  background-color: ${colors.primary};
  color: ${colors.white};
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  margin: 20px;
`;

const ButtonsImovelContainer = styled.div<{
  isMobile: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImovelTittleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 100%;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

const LocalContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  gap: 10px;
  padding: 10px;
  background: ${colors.white};
  border-radius: 5px;
  border: 1px solid ${colors.primary};
`;

const BodyContainer = styled.div<{ isMobile: boolean }>`
  position: block;
  height: auto;
  width: auto;
`;

const ImovelDescriptionTextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px 20px;
`;

const ImovelDescriptionContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FullScreenBox = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
`;
