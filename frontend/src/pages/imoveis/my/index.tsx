import { GetServerSideProps } from "next";
import styled from "styled-components";
import CardMyImovel from "../../../components/CardMyImovel";
import ListCards from "../../../components/Page/lista/ListCards";
import { getCookie } from "../../../lib/cookies";
import { getByLocador } from "../../../lib/imovel";
import { IImovel } from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import Header from "../../../components/TopBar";

export default function MyImoveis({ imoveis }: { imoveis: IImovel[] }) {

  return (
    <Container>
      <Header pageName="Meus imóveis"></Header>
      <ListCards imoveis={imoveis} cardComponent={CardMyImovel}></ListCards>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userid = getCookie("@corretora:userid", context);

  const pageImoveis = await getByLocador(userid, context);

  if (!userid)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      imoveis: pageImoveis.data,
    },
  };
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.white};
`;
