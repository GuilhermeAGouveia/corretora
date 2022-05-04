import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../context/Auth";
import { getCidades, getEstados } from "../../../../../lib/externalData";
import { insertManyImages } from "../../../../../lib/imagens";
import {
  insertImovel,
  parseFormImovelToIImovel
} from "../../../../../lib/imovel";
import ImageUploader, { UploadedFile } from "../../../../ImageUploader";
import Input from "../../../../Input";
import SelectReactHookForm, {
  SelectOption
} from "../../../../SelectReactHookForm";
import {
  ButtonSubmit,
  Form,
  LineDivision,
  SectionInputContainer,
  SectionInputContent,
  SectionLabel
} from "./formStyles";

export interface FormImovel {
  street?: string;
  number?: string;
  district?: string;
  state?: string;
  city?: string;
  apto?: string;
  mensalidade?: string;
  price?: string;
  area?: string;
}

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

interface FormImovelProps {
  aditionalFields?: Field[];
}

const FormImovel = ({ aditionalFields }: FormImovelProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
  const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
  const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades
  const [imagens, setImagens] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: FormImovel) => {
    if (!user) return;

    setLoading(true);
    const imovelData = parseFormImovelToIImovel({
      ...formValues,
      idOwner: user.id,
    });
    const idImovel = await insertImovel(imovelData);

    insertManyImages(imagens, idImovel);

    setLoading(false);
  };

  useEffect(() => {
    const setEstadosFromExternalData = async () => {
      const estados = await getEstados();
      setEstados(estados);
    };

    setEstadosFromExternalData();
  }, []);

  useEffect(() => {
    const setCidadesFromExternalData = async () => {
      const cidades = await getCidades(estado);
      setCidades(cidades);
    };

    setCidadesFromExternalData();
  }, [estado]);

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
          <Input name="street" register={register} placeholder="Rua" required />
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
            name="area"
            type="number"
            register={register}
            placeholder="Área (m²)"
            defaultValue={0}
          />
          {aditionalFields?.map((field) => {
            return (
              <Input
                key={field.name}
                name={field.name}
                type={field.type}
                register={register}
                placeholder={field.label}
                defaultValue={field.defaultValue}
              />
            );
          })}
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
      <ButtonSubmit type="submit">
        {loading ? "Loading..." : "Cadastrar"}
      </ButtonSubmit>
    </Form>
  );
};

export default FormImovel;
