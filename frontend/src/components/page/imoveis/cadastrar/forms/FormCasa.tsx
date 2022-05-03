import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../../../../components/Input";
import colors from "../../../../../styles/colors";
import ImageUploader from "../../../../ImageUploader";
import SelectReactHookForm, {
    SelectOption
} from "../../../../SelectReactHookForm";

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  nome: string;
}

interface FormValues {
  rua?: string;
  numero?: string;
  bairro?: string;
  estado?: string;
}

const FormCadastrarCasa = () => {
  const { register, handleSubmit, control } = useForm();
  const [estados, setEstados] = useState<SelectOption[]>([]);
  const [cidades, setCidades] = useState<SelectOption[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({} as FormValues);

  const onSubmit = async (data: FormValues) => {
    const { rua, numero, bairro, estado } = data;
    console.log(data);
    setFormValues(data);
  };
  useEffect(() => {
    const getEstados = async () => {
      const response = await axios.get<(Estado & { id: number })[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const estados = response.data.map(({ sigla: value, nome: label, id }) => {
        return {
          value,
          label,
        };
      });

      setEstados(estados);
    };

    const getCidades = async () => {
      const response = await axios.get<(Estado & { id: number })[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const cidades = response.data.map(({ sigla: value, nome: label, id }) => {
        return {
          value,
          label,
        };
      });

      setCidades(cidades);
    };
    getCidades();
    getEstados();
  }, []);
  useEffect(() => {}, []);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SectionInputContainer>
        <SectionLabel>Imagens</SectionLabel>
        <SectionInputContent>
          <ImageUploader />
        </SectionInputContent>
      </SectionInputContainer>
      <SectionInputContainer>
        <SectionLabel>Endereço</SectionLabel>
        <SectionInputContent>
          <Input name="rua" register={register} placeholder="Rua" />
          <Input name="numero" register={register} placeholder="Número" />
          <Input name="bairro" register={register} placeholder="bairro" />
          {"\n"}
          <SelectReactHookForm
            style={{
              maxWidth: "400px",
            }}
            name="estado"
            placeholder="Estado"
            options={estados}
            controlReactHookForm={control}
          ></SelectReactHookForm>
          <SelectReactHookForm
            style={{
              maxWidth: "400px",
            }}
            name="cidade"
            placeholder="Cidade"
            options={estados}
            controlReactHookForm={control}
          ></SelectReactHookForm>
        </SectionInputContent>
      </SectionInputContainer>
      <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
    </Form>
  );
};

export default FormCadastrarCasa;

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SectionInputContainer = styled.label`
  position: relative;
  width: 100%;
  height: auto;
  margin: 10px;
`;

const SectionLabel = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const SectionInputContent = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  & > * {
    margin: 10px;
  }
`;

const ButtonSubmit = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${colors.secondary};
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
`;
