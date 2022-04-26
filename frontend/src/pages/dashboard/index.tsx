import { parseCookies } from "nookies";
import SelectOption from "../../components/SelectOption";
import { useAuth } from "../../context/Auth";

export default function Dashboard(props: any) {
  const { user } = useAuth();
  console.log(user)
  const optionsSelect = [
      {
        label: "Alugar",
      },
      {
        label: "Comprar",
      },
      {
        label: "Vender",
      }
  ]
  return (
    <div>
      <SelectOption options={optionsSelect}></SelectOption>
      <p>Bem vindo {user?.firstName}</p>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const token = parseCookies(ctx)["@corretora:token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
