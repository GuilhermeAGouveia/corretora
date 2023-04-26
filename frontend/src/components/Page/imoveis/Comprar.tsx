import { WhatsApp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { IImovel, Locador } from "../../../lib/interfaces";
import {
    ButtonImovel,
    ButtonsImovelContainer,
} from "../../../pages/imoveis/[imovel]";
import colors from "../../../styles/colors";

interface ComprarProps {
  imovel: IImovel;
  locador: Locador;
}

export default function Comprar({ imovel, locador }: ComprarProps) {
  const router = useRouter();
  const { isMobileView } = useDeviceDetect();
  const getTextMessage = () =>
    encodeURI(
      `https://api.whatsapp.com/send?phone=${locador.phones[0].numero}&text=Olá, ${locador.firstName}!\nGostaria de mais informações sobre o imóvel ${window.location.href}`
    );

  useEffect(() => {
    console.log(getTextMessage())
    console.log(locador.phones)
  }, []);
  return (
    <ActionImovelContainer isMobile={isMobileView}>
      <ActionImovelTitle>Comprar</ActionImovelTitle>
      <ButtonsImovelContainer isMobile={isMobileView}>
        <ButtonImovel
          onClick={() =>
            (location.href = `https://web.whatsapp.com/send/?phone=${
              locador.phones[0].numero
            }&text=${getTextMessage()}&type=phone_number&app_absent=0`)
          }
        >
          <WhatsApp
            sx={{
              color: colors.white,
              fontSize: 40,
            }}
          />
          <Typography
            fontFamily={"Lato, sans-serif"}
            fontWeight={600}
            fontSize={18}
          >
            Enviar mensagem
          </Typography>
        </ButtonImovel>
        <ButtonImovel>
          <WhatsApp
            sx={{
              color: colors.white,
              fontSize: 40,
            }}
          />
          <Typography
            fontFamily={"Lato, sans-serif"}
            fontWeight={600}
            fontSize={18}
          >
            Enviar email
          </Typography>
        </ButtonImovel>
      </ButtonsImovelContainer>
    </ActionImovelContainer>
  );
}

const ActionImovelContainer = styled.div<{
  isMobile: boolean;
}>`
  width: 100%;
  height: ${(props) => (props.isMobile ? "auto" : "100%")};
  background-color: ${colors.secondary};
`;
const ActionImovelTitle = styled(Typography)`
  width: 100%;
  height: 50px;
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
`;
