import styled from "styled-components";
import colors from "../colors";

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
export const LoginLeft = styled.div`
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
export const LoginLeftContent = styled.div`
  position: relative;
  width: 80%;

  min-width: 250px;
  max-width: 350px;
  height: 80%;
`;
export const LoginContainerTitle = styled.div`
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
export const SignInGoogleButton = styled.button`
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
export const DivisionLine = styled.div`
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
export const LoginForm = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
export const LoginFormButton = styled.button`
  position: relative;
  height: 42px;
  margin-top: 20px;
  width: 100%;
  border: none;
  border-radius: 21px;
  background-color: ${colors.secondary};
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: white;
`;
export const LoginRight = styled.div`
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
export const SignUpButton = styled.button`
  position: relative;
  width: auto;
  border: none;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.secondary};
`;
export const LogoCompany = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;
