import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../../../../components/Input";
import ImageUploader from "../../../../ImageUploader";

const FormCadastrarCasa = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Form>
      <ImageUploader />
      <Input name="nome" placeholder="nome" register={register} />
      <Input name="nome" placeholder="nome" register={register} />
      <Input name="nome" placeholder="nome" register={register} />
    </Form>
  );
};

export default FormCadastrarCasa;

const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;
