import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import Button from "../../Button";
import Logo from '../../Logo';
import SlideHorizontalBanner from "../../SlideHorizontalBanner";
import SlideVerticalBanner from "../../SlideVerticalBanner";


const Header = () => {
  const router = useRouter();
  const [labelButton, setLabelButton] = useState("Teste");
  const contentHorizontalCards = [
    {
      text: "O que você procura?",
    },
    {
      text: "Casa?",
      image:
        "https://www.decorfacil.com/wp-content/uploads/2015/04/imagem-356.jpg",
    },
    {
      text: "Apto?",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      text: "Comércio?",
      image:
        "https://images.sysone.com.br/39/fotos/imoveis/392948/hd/fachada-2.jpg",
    },
    {
      text: "Temos tudo!",
    },
  ];
  return (
    <HeaderContainer>
      <HeaderTop>
        <Button label={"Login"} onClick={() => router.push("/login")}></Button>
        <Logo/>
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
          <CompanySlideVerticalBanner
            contentCards={["vende", "aluga", "compra"]}
          ></CompanySlideVerticalBanner>
        </CompanyBannerContainer>
        <CompanyBannerContainer>
          <CompanySlideHorizontalBanner
            contentCards={contentHorizontalCards}
          ></CompanySlideHorizontalBanner>
        </CompanyBannerContainer>
      </HeaderContent>
      <HeaderBottom>
        <HeaderBottomButton onClick={() => router.push("lista")}>Anunciar</HeaderBottomButton>
        <LineDivision />
        <HeaderBottomButton onClick={() => router.push("lista")}>Procurar</HeaderBottomButton>
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
const CompanySlideVerticalBanner = styled(SlideVerticalBanner)`
  position: relative;
  width: 168px;
  height: 63px;
`;

const CompanySlideHorizontalBanner = styled(SlideHorizontalBanner)`
  position: relative;
  margin: 0 20px;
  max-width: 400px;
  height: 100%;
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
