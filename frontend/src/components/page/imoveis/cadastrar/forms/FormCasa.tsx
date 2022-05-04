import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../../../../components/Input";
import { useAuth } from "../../../../../context/Auth";
import { insertImage } from "../../../../../lib/imagens";
import { insertImovel } from "../../../../../lib/imovel";
import { IImovel, ImovelType } from "../../../../../lib/interfaces";
import colors from "../../../../../styles/colors";
import ImageUploader, { UploadedFile } from "../../../../ImageUploader";
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
  street?: string;
  number?: string;
  district?: string;
  state?: string;
  city?: string;
  apto?: string;
  nRooms?: string;
  nBathrooms?: string;
  area?: string;
  mensalidade?: string;
  price?: string;
}

const FormCadastrarCasa = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
  const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
  const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades
  const [imagens, setImagens] = useState<UploadedFile[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({} as FormValues);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: FormValues) => {
    const {
      street,
      number,
      district,
      state,
      city,
      nRooms,
      nBathrooms,
      area,
      mensalidade,
      price,
    } = formValues;


    setFormValues(formValues);

    if (!!user) {
      setLoading(true);
      const imovelData = {
        address: `${street}, ${number}`,
        district: district as string,
        state: state as string,
        city: city as string,
        nRooms: nRooms ? parseInt(nRooms) : 0,
        nBathrooms: nBathrooms ? parseInt(nBathrooms) : 0,
        area: area ? parseFloat(area) : 0,
        cod_lcd: user.id,
        cep: "",
        mensalidade: mensalidade ? parseFloat(mensalidade) : 0,
        price: price ? parseFloat(price) : 0,
        type: ImovelType.CASA,
      } as IImovel
      console.log(imovelData)
      const idImovel = await insertImovel(imovelData);

      imagens.forEach(async (file) => {
        await insertImage(file.file, idImovel);
      });


      setLoading(false);
    }
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

    getEstados();
  }, []);

  useEffect(() => {
    const getCidades = async () => {
      const response = await axios.get<(Estado & { id: number })[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
      );
      const cidades = response.data.map(({ nome }) => {
        return {
          value: nome,
          label: nome,
        };
      });

      setCidades(cidades);
    };
    getCidades();
  }, [estado]);
  useEffect(() => {
    console.log("imagens", imagens);
  }, [imagens]);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SectionInputContainer>
        <SectionLabel>
          Insira imagens de seu imóvel <LineDivision />
        </SectionLabel>

        <SectionInputContent>
          <ImageUploader uploaded={[imagens, setImagens]} />
        </SectionInputContent>
      </SectionInputContainer>
      <SectionInputContainer>
        <SectionLabel>
          Endereço <LineDivision />
        </SectionLabel>

        <SectionInputContent>
          <Input
            name="street"
            register={register}
            placeholder="Rua"
            required
          />
          <Input
            name="number"
            type="number"
            register={register}
            placeholder="Número"
            required
          />
          <Input
            name="district"
            register={register}
            placeholder="Bairro"
            required
          />
          {"\n"}
          <SelectReactHookForm
            style={{
              maxWidth: "400px",
            }}
            name="state"
            placeholder="Estado"
            options={estados}
            controlReactHookForm={control}
            onChange={(value) => setEstado(value)}
            required
          ></SelectReactHookForm>
          <SelectReactHookForm
            style={{
              maxWidth: "400px",
            }}
            name="city"
            placeholder="Cidade"
            options={cidades}
            controlReactHookForm={control}
            required
          ></SelectReactHookForm>
        </SectionInputContent>
      </SectionInputContainer>
      <SectionInputContainer>
        <SectionLabel>
          Caracteristicas <LineDivision />
        </SectionLabel>

        <SectionInputContent>
          <Input
            name="nRooms"
            type="number"
            register={register}
            placeholder="Número de quartos"
            defaultValue={0}
          />
          <Input
            name="nBathrooms"
            type="number"
            register={register}
            placeholder="Número de Banheiros"
            defaultValue={0}
          />
          <Input
            name="area"
            type="number"
            register={register}
            placeholder="Área (m²)"
            defaultValue={0}
          />
          {"\n"}
        </SectionInputContent>
      </SectionInputContainer>
      <SectionInputContainer>
        <SectionLabel>
          Valores <LineDivision />
        </SectionLabel>

        <SectionInputContent>
          <Input
            name="mensalidade"
            type="number"
            register={register}
            placeholder="Mensalidade (R$)"
            defaultValue={0}
          />
          <Input
            name="price"
            type="number"
            register={register}
            placeholder="Preço de venda (R$)"
            defaultValue={0}
          />
        </SectionInputContent>
      </SectionInputContainer>
      <ButtonSubmit type="submit">{loading ? "Loading..." : "Cadastrar"}</ButtonSubmit>
    </Form>
  );
};

export default FormCadastrarCasa;

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SectionInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const SectionLabel = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const LineDivision = styled.div`
  position: relative;
  width: 100%;
  margin: 0 10px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;
