import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BannerInfo from "../../components/BannerInfo";
import Logo from "../../components/Logo";
import { useAuth } from "../../context/Auth";
import colors from "../../styles/colors";

export default function Login() {
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
      setErrorOrSucess("sucess");
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
        <Logo />
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
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginFormInput
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <LoginFormInput
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <LoginFormButton type="submit">
              {loading ? "Carregando..." : "Entrar"}
            </LoginFormButton>
          </LoginForm>
          <DivisionLine>
            <p>Novo aqui? {'\t'}
            <SignUpButton type="button">Cadastrar</SignUpButton>
            </p>
          </DivisionLine>
        </LoginLeftContent>
      </LoginLeft>
      <LoginRight></LoginRight>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  background-color: white;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

const LoginLeftContent = styled.div`
  position: relative;
  width: 80%;

  min-width: 250px;
  max-width: 350px;
  height: 80%;
`;

const LoginContainerTitle = styled.div`
  position: relative;
  p {
    font-family: "Poppins", sans-serif;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }

  h1 {
    color: ${colors.secondary};
    font-family: "Poppins", sans-serif;
    font-weight: 500;
  }
`;

const SignInGoogleButton = styled.button`
  position: relative;
  margin-top: 35px;
  height: 42px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 21px;
  font-family: "Poppins", sans-serif;
  font-size: 0.9em;
  font-weight: 500;
`;

const DivisionLine = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    background-color: white;
    padding: 0 10px;
  }
`;

const LoginForm = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const LoginFormInput = styled.input`
  position: relative;
  height: 42px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 21px;
  padding: 0 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  margin: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const LoginFormButton = styled.button`
  position: relative;
  height: 42px;
  margin-top: 20px;
  width: 100%;
  border: none;
  border-radius: 21px;
  background-color: ${colors.primary};
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

const LoginRight = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  background-color: ${colors.secondary};

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const SignUpButton = styled.button`
  position: relative;
  height: 42px;
  width: auto;
  border: none;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.primary};
`;
