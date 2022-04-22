import { GetStaticProps } from "next";
import { getAllImovel } from "../../lib/imovel";
import { IImovel } from "../../lib/interfaces";
import api from "../../services/api";
interface Props {
  imovel: IImovel;
}

export function ImovelPage({ imovel }: Props) {
  return (
    <div>
      <h1>{imovel.type}</h1>
      <p>{imovel.supDescribe}</p>
    </div>
  );
}

export default ImovelPage;


/* export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const token = getCookie("@corretora:token", ctx);
  const api = getAPIHTTPClient(ctx);
  const { cod } = ctx.params || { cod: '' };
  const {data: imovel} = await api.get<IImovel>(`/imovel/get/${cod}`);
  return {
    props: {
      imovel,
    },
  };
};
 */

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const { cod } = ctx.params;
  const {data: imovel} = await api.get<IImovel>(`/imovel/get/${cod}`);
  return {
    props: {
      imovel,
    },
  };
};

export const getStaticPaths = async () => {
  const imoveis = await getAllImovel();
  return {
    paths: imoveis.map((imovel) => ({
      params: {
        cod: imovel.cod_imv,
      },
    })),
    fallback: false,
  }; 
};
