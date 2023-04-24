import { MoreVert } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RoomIcon from "@mui/icons-material/Room";
import { Typography } from "@mui/material";
import { capitalize } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
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
  const { isMobileView } = useDeviceDetect();
  return (
    <ImovelDetailContainer>
      <TopBar pageName="Detalhes do Imóvel" />
      <TopContainer>
        <PropietarioContainer>
          <PropietarioAvatar>
            <Image src={avatarPNG} alt="Avatar" width={30} />
          </PropietarioAvatar>
          <PropietarioInfo>
            <Typography fontSize={"small"} fontFamily={"Lato, sans-serif"}>
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
            <Image src={casaPNG} alt="Casa" layout="fill" objectFit="cover" />
          </MainImageContainer>
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
              <Typography
                sx={{
                  position: "relative",
                  left: 10,
                  top: 5,
                  fontWeight: 500,
                }}
              >
                {imovel?.address}, {imovel?.city}, {imovel?.state}
              </Typography>
              <RoomIcon
                sx={{
                  color: colors.primary,
                  fontSize: 20,
                  position: "absolute",
                  left: 5,
                  top: 5,
                }}
              />
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
              backgroundColor: colors.white,
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
    </ImovelDetailContainer>
  );
}

const ImovelDetailContainer = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
`;

const TopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 10px;
`;

const PropietarioContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 40%;
  align-items: center;
  justify-content: center;
`;

const PropietarioAvatar = styled.div`
  position: relative;
  display: flex;
  min-height: 40px;
  min-width: 40px;
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
  height: 100%;
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
  display: flex;
  height: calc(60vh - 100px);
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 20px auto;
`;
const MainImageContainer = styled("div")`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const ButtonImovel = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 130px;
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
  position: ${(props) => (props.isMobile ? "absolute" : "relative")};
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "row" : "column")};
  height: ${(props) => (props.isMobile ? "160px" : "auto")};
  width: ${(props) => (props.isMobile ? "100%" : "400px")};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  bottom: ${(props) => (props.isMobile ? "-160px" : "auto")};
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
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px;
  padding-top: 20px;
  background: ${colors.white};
  border-radius: 5px;
  border: 1px solid ${colors.primary};
`;

const BodyContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  height: 70vh;
  width: 100%;
  align-items: ${(props) => (props.isMobile ? "center" : "flex-start")};
  margin-top: ${(props) => (props.isMobile ? "0px" : "10vh")};
  justify-content: center;
`;

const ImovelDescriptionTextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px 20px;
  margin-top: 20px;
`;

const ImovelDescriptionContainer = styled.div<{isMobile: boolean}>`
  position: relative;
  display: flex;
  flex-direction: column; 
  width: ${({isMobile}) => isMobile ? "100%" : "50%"};
`;
