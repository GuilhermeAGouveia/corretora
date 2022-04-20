import { getAllImovel, getByCodImovel } from "../../lib/imovel";
import { IImovel } from "../../lib/interfaces";
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

export const getStaticProps = async ({ params }: any) => {
  const imovel = await getByCodImovel(params.cod);
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
