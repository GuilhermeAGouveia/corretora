import { GetServerSideProps } from "next";
import Cadastrar from "../../../components/Cadastrar";
import FormImovel from "../../../components/Page/imoveis/cadastrar/forms/FormImovel";
import { getCookie } from "../../../lib/cookies";
import { ImovelType } from "../../../lib/interfaces";

interface CadastrarProps {
  tipo: ImovelType;
}

export default function CadastrarImovel({ tipo }: CadastrarProps) {
  function captalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return (
    <Cadastrar
      title={`Cadastrar ${captalize(tipo)}`}
      form={<FormImovel imovelType={tipo} />}
    />
  );
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