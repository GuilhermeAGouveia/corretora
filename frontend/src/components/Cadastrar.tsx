import styled from "styled-components";
import colors from "../styles/colors";
import MenuUserOptions from "./page/lista/MenuUserOptions";

interface CadastrarProps {
  title: string;
  form?: React.ReactNode | string;
}

const Cadastrar = ({ title, form }: CadastrarProps) => {
  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>{title}</RegisterTitle>
        <MenuUserOptions buttonTextColor="black" />
      </RegisterHeader>

      <RegisterContent>{form}</RegisterContent>
    </RegisterContainer>
  );
};

export default Cadastrar;

const RegisterContainer = styled.div`
  position: relative;
  width: 100%;
  background: ${colors.white};
  min-height: 100vh;
`;

const RegisterTitle = styled.div`
  position: relative;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const RegisterHeader = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const RegisterContent = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  background: white;
  border-radius: 30px;
  padding: 20px;
  border: 1px solid ${colors.primary};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
