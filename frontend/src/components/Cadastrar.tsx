import styled from "styled-components";
import colors from "../styles/colors";
import MenuUserOptions from "./Page/lista/MenuUserOptions";
import {useEffect} from "react";

interface CadastrarProps {
  title: string;
  form?: React.ReactNode | string;
}


const Cadastrar = ({ title, form }: CadastrarProps) => {
    useEffect(() => console.log("Cdastrar - render"), []);
  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>{title}</RegisterTitle>
        <MenuUserOptions />
      </RegisterHeader>

      <RegisterContent>{form}</RegisterContent>
    </RegisterContainer>
  );
};

export default Cadastrar;

const RegisterContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

`;

const RegisterTitle = styled.div`
  position: relative;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: ${colors.white};
`;

const RegisterHeader = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  min-height: 200px;
  max-height: 350px;
  background: ${colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px;
`;

const RegisterContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  min-height: calc(10vh - 100px);
  margin: 0px auto;
  background: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    margin: 0px 10px;
    width: calc(100% - 20px);
  }
`;
