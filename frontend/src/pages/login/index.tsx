import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BannerInfo from "../../components/BannerInfo";
import Input from "../../components/Input";
import LogoComponent from "../../components/Logo";
import { useAuth } from "../../context/Auth";
import { DivisionLine, LoginContainer, LoginContainerTitle, LoginForm, LoginFormButton, LoginLeft, LoginLeftContent, LoginRight, LogoCompany, SignInGoogleButton, SignUpButton } from "../../styles/pages/login";

export default function Login() {

  const router = useRouter();
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const setErrorOrSucess = (state: "sucess" | "error" | "reset") => {
    switch (state) {
      case "sucess":
        setSucess(true);
        setError(false);
        break;
      case "error":
        setError(true);
        setSucess(false);
        break;
      case "reset":
        setError(false);
        setSucess(false);

        break;
      default:
        break;
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await login(data);
      router.push("/lista");

    } catch (error) {
      console.log(error);
      setErrorOrSucess("error");
    }
    setLoading(false);
    const timeout = setTimeout(() => {
      setErrorOrSucess("reset");
    }, 3100);
    return () => clearTimeout(timeout);
  };

  return (
    <LoginContainer>
      {error && (
        <BannerInfo bgColor={"red"}>Erro no login, tente novamente</BannerInfo>
      )}
      {sucess && <BannerInfo bgColor={"green"}>Sucesso</BannerInfo>}
      <LoginLeft>
        <LogoCompany>
          <LogoComponent />
        </LogoCompany>
        <LoginLeftContent>
          <LoginContainerTitle>
            <h1>Login</h1>
            <p>Alugue ou compre os melhores imóveis pelos melhores preços</p>
          </LoginContainerTitle>
          <SignInGoogleButton type="button">
            Sign in with Google
          </SignInGoogleButton>
          <DivisionLine>
            <p>or Sign with Email</p>
          </DivisionLine>
          <LoginForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              register={register}
            ></Input>

            <Input
              type="password"
              placeholder="Password"
              register={register}
              name="password"
            ></Input>

            <LoginFormButton type="submit">
              {loading ? "Carregando..." : "Entrar"}
            </LoginFormButton>
          </LoginForm>
          <DivisionLine>
            <p>
              Novo aqui? {"\t"}
              <SignUpButton type="button" onClick={() => router.push("/register")}>Cadastrar</SignUpButton>
            </p>
          </DivisionLine>
        </LoginLeftContent>
      </LoginLeft>
      <LoginRight></LoginRight>
    </LoginContainer>
  );
}


