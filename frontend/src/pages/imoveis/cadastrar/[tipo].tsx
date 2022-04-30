import { GetServerSideProps } from "next";
import { getCookie } from "../../../lib/cookies";
import { ImovelType } from "../../../lib/interfaces";

interface CadastrarProps {
  tipo: ImovelType;
}

export default function CadastrarImovel({tipo}: CadastrarProps) {
  const JSXByTipo = {
    [ImovelType.CASA]: (
      <h1>Cadastrar Casa</h1>
    ),
    [ImovelType.APTO]: (
      <h1>Cadastrar Apartamento</h1>
    ),
    [ImovelType.COMERCIO]: (
      <h1>Cadastrar Comércio</h1>
    ),
  }

  return JSXByTipo[tipo];

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie("@corretora:token", context);
  const tipo = context.query.tipo as ImovelType;

  if (!token)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {
      tipo,
    },
  };
};
