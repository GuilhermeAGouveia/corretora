import { GetServerSideProps } from "next";
import styled from "styled-components";
import CardMyImovel from "../../../components/CardMyImovel";
import { getCookie } from "../../../lib/cookies";
import { getByLocador } from "../../../lib/imovel";
import { IImovel } from "../../../lib/interfaces";
import colors from "../../../styles/colors";
import TopBar from "../../../components/TopBar";
import { List } from "@mui/material";

export default function MyImoveis({ imoveis }: { imoveis: IImovel[] }) {
  return (
    <Container>
      <TopBar pageName="Meus Imóveis"></TopBar>
      <List
        style={{
          padding: "10px 20px",
        }}
      >
        {imoveis.map((imovel) => (
          <CardMyImovel key={imovel.cod_imv} imovel={imovel} />
        ))}
      </List>
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
