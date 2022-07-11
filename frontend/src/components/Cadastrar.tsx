import styled from "styled-components";
import colors from "../styles/colors";
import MenuUserOptions from "./Page/lista/MenuUserOptions";

interface CadastrarProps {
  title: string;
  form?: React.ReactNode | string;
}

const Cadastrar = ({ title, form }: CadastrarProps) => {
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
  height: 50vh;
  background: ${colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px;
`;

const RegisterContent = styled.div`
  position: relative;
  width: 100%;
  top: -100px;
  max-width: 800px;
  min-height: calc(10vh - 100px);
  margin: 0px auto;
  background: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;
