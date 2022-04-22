import { getAllImovel } from "../../lib/imovel";
import { IImovel } from "../../lib/interfaces";
import { getAPIHTTPClient } from "../../services/api";
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

export const getStaticProps = async (ctx: any) => {
  const api = getAPIHTTPClient(ctx);
  const { cod } = ctx.params || { cod: '' };
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
