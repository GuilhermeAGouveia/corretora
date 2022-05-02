import { GetServerSideProps } from "next";
import Cadastrar from "../../../components/Cadastrar";
import { getCookie } from "../../../lib/cookies";
import { ImovelType } from "../../../lib/interfaces";

interface CadastrarProps {
  tipo: ImovelType;
}

export default function CadastrarImovel({tipo}: CadastrarProps) {
  const JSXByTipo = {
    [ImovelType.CASA]: (
      <Cadastrar title="Cadastrar Casa" form={"Formulário para cadastrar casa"}/>
    ),
    [ImovelType.APTO]: (
      <Cadastrar title="Cadastrar Apartamento" form={"Formulário para cadastrar apartamento"}/>
    ),
    [ImovelType.COMERCIO]: (
      <Cadastrar title="Cadastrar Comércio" form={"Formulário para cadastrar comércio"}/>
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
