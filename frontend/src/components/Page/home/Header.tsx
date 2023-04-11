import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { getRandomImageByImovelType } from "../../../lib/imagem";
import { ImovelType } from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import Button from "../../Button";
import Logo from "../../Logo";
import SlideBanner from "../../SlideBanner";

const Header = () => {
  const router = useRouter();
  const [labelButton, setLabelButton] = useState("Teste");
  const contentHorizontalCards = [
    {
      text: "O que você procura?",
    },
    {
      text: "Casa?",
      image: getRandomImageByImovelType(ImovelType.CASA),
    },
    {
      text: "Apto?",
      image: getRandomImageByImovelType(ImovelType.APTO),
    },
    {
      text: "Comércio?",
      image: getRandomImageByImovelType(ImovelType.COMERCIO),
    },
    {
      text: "Temos tudo!",
    },
  ];
  return (
    <HeaderContainer>
      <HeaderTop>
        <Button label={"Login"} onClick={() => router.push("/login")}></Button>
        <Logo />
        <Button
          label={labelButton}
          onClick={() => {
            router.push("/imovel/cl27u669x0007mjly3n30dvn3");
            setLabelButton("Loading...");
          }}
        ></Button>
      </HeaderTop>
      <CompanyName>BlueHome</CompanyName>
      <HeaderContent>
        <CompanyBannerContainer>
          <CompanyBannerText>Aqui vc</CompanyBannerText>
          <SlideBanner
            contentCards={[
              { text: "vende" },
              { text: "aluga" },
              { text: "compra" },
            ]}
            style={{
              width: "168px",
              height: "63px",
            }}
            direction="vertical"
          ></SlideBanner>
        </CompanyBannerContainer>
        <CompanyBannerContainer>
          <SlideBanner
            style={{
              margin: "0 20px",
              maxWidth: "400px",
              height: "100%",
            }}
            contentCards={contentHorizontalCards}
          ></SlideBanner>
        </CompanyBannerContainer>
      </HeaderContent>
      <HeaderBottom>
        <HeaderBottomButton onClick={() => router.push("lista")}>
          Anunciar
        </HeaderBottomButton>
        <LineDivision />
        <HeaderBottomButton onClick={() => router.push("lista?action=anunciar")}>
          Procurar
        </HeaderBottomButton>
      </HeaderBottom>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: ${colors.secondary};
  overflow: hidden;
`;

const HeaderTop = styled.div`
  position: relative;
  height: 52px;
  margin: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div`
  position: relative;
  height: calc(100% - 52px);
  width: 100%;
  display: block;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const CompanyName = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  font-family: "Montserrat", sans-serif;
  color: ${colors.gray};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const CompanyBannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompanyBannerText = styled.div`
  position: relative;
  height: 100%;
  margin-right: 20px;
  font-family: "Montserrat", sans-serif;
  color: #a9a9a9;
  font-weight: 300;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderBottom = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBottomButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: ${colors.primary};
`;

const LineDivision = styled.div`
  position: relative;
  width: 1px;
  height: 100%;
  background-color: ${colors.primary};
`;
