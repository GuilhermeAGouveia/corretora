import { GetServerSideProps } from "next";
import Cadastrar from "../../../components/Cadastrar";
import FormImovel from "../../../components/page/imoveis/cadastrar/forms/FormImovel";
import { ImovelType } from "../../../lib/interfaces";

interface CadastrarProps {
  tipo: ImovelType;
}

export default function CadastrarImovel({ tipo }: CadastrarProps) {
  return (
    <Cadastrar
      title="Cadastrar Comércio"
      form={<FormImovel imovelType={tipo} />}
    />
  );
}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
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
}; */


export const getServerSideProps: GetServerSideProps = async (context) => {
  const tipo = context.query.tipo as ImovelType;

  return {
    props: {
      tipo,
    },
  };
};