import MenuUserOptions from "../../lista/MenuUserOptions";
import {
  RegisterContainer,
  RegisterContent,
  RegisterHeader,
  RegisterTitle
} from "./styles";

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
