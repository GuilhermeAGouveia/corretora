import { parseCookies } from "nookies";
import { useAuth } from "../../context/Auth";

export default function Dashboard(props: any) {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem vindo {user?.firstName}</p>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const token = parseCookies(ctx)["@corretora:token"];
  console.log(token);
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
