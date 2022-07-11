import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../context/Auth";
import { Field, getAditionalFields } from "../../../../../lib/aditionalFields";
import { getCidades, getEstados } from "../../../../../lib/externalData";
import { insertManyImages } from "../../../../../lib/imagem";
import {
  insertImovel,
  parseFormImovelToIImovel
} from "../../../../../lib/imovel";
import { ImovelType } from "../../../../../lib/interfaces";
import ImageUploader, { UploadedFile } from "../../../../ImageUploader";
import Input from "../../../../Input";
import SelectReactHookForm, {
  SelectOption
} from "../../../../SelectReactHookForm";
import ShowTrail from "./component/ShowTrail";
import {
  ActionsForm,
  AreaShow, Form,
  FormContent,
  FormContentWrapper,
  FormHeader,
  ReturnButton,
  SectionInputContainer,
  SectionInputContent
} from "./styles";

export interface FormImovel {
  street?: string;
  number?: string;
  district?: string;
  state?: string;
  city?: string;
  type?: ImovelType;
  apto?: string;
  mensalidade?: string;
  price?: string;
  area?: string;
}

interface FormImovelProps {
  aditionalFields?: Field[];
  imovelType: ImovelType;
}

const FormImovel = ({ imovelType, aditionalFields }: FormImovelProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
  const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
  const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades
  const [imagens, setImagens] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [trail, setTrail] = useState(0);

  const setProgressUploadFile = (fileId: string, progress: number) => {
    setImagens(
      imagens.map((file) => {
        if (file.id === fileId) {
          file.progress = progress;
        }
        return file;
      })
    );
  };

  const getTotalSizeImagens = (imagens: UploadedFile[]) => {
    let totalSize = 0;
    imagens.forEach((imagem) => {
      totalSize += imagem.file.size;
    });
    return totalSize;
  };

  const getAllProgressUploadFile = useCallback((imagens: UploadedFile[]) => {
    let totalProgress = 0;
    let totalSize = getTotalSizeImagens(imagens);
    for (const imagem of imagens) {
      if (!imagem.progress) break; //[Otimizacao] O array de imagens é processado sequenciamente, então se em algum momento o progress for 0, não precisa continuar o loop
      totalProgress += imagem.progress * imagem.file.size;
    }
    return totalSize ? Math.round(totalProgress / totalSize) : 0; // O ternário evita divisão por zero
  }, []);

  const onSubmit = async (formValues: FormImovel) => {
    if (!user || loading) return; //se o usuário não estiver logado ou o form estiver carregando, não faz nada

    setLoading(true);
    const imovelData = parseFormImovelToIImovel({
      ...formValues,
      idOwner: user.id,
      type: imovelType,
    });
    const idImovel = await insertImovel(imovelData);

    await insertManyImages(imagens, idImovel, setProgressUploadFile);

    setLoading(false);
  };

  useEffect(() => {
    setTotalProgress(getAllProgressUploadFile(imagens));
  }, [getAllProgressUploadFile, imagens]);

  useEffect(() => {
    const setCidadesFromExternalData = async () => {
      const cidades = await getCidades(estado);
      setCidades(cidades);
    };

    setCidadesFromExternalData();
  }, [estado]);

  useEffect(() => {
    const setEstadosFromExternalData = async () => {
      const estados = await getEstados();
      setEstados(estados);
    };

    setEstadosFromExternalData();
  }, []);

  useEffect(() => {
    console.log(trail)
  }, [trail])
  const trailsObject = [
    {
      icon: "imagens",
      content: (
        <SectionInputContainer>
          <SectionInputContent>
            <ImageUploader uploaded={[imagens, setImagens]} />
          </SectionInputContent>
        </SectionInputContainer>
      ),
    },
    {
      icon: "detalhes",
      content: (
        <SectionInputContainer>
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
                opacity: cidades.length ? 1 : 0.5,
              }}
              name="city"
              placeholder="Cidade"
              options={cidades}
              controlReactHookForm={control}
              required
            ></SelectReactHookForm>
          </SectionInputContent>
        </SectionInputContainer>
      ),
    },
    {
      icon: "especifico",
      content: (
        <SectionInputContainer>
          <SectionInputContent>
            <Input
              name="area"
              type="number"
              register={register}
              placeholder="Área (m²)"
              defaultValue={0}
            />
            {getAditionalFields(imovelType).map((field) => {
              return (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  register={register}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                />
              );
            })}
          </SectionInputContent>
        </SectionInputContainer>
      ),
    },
    {
      icon: "valor",
      content: (
        <SectionInputContainer>
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
      ),
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <ActionsForm>
          <ReturnButton onClick={() => setTrail(old => old - 1)}></ReturnButton>
          <AreaShow>Insira suas imagens aqui</AreaShow>
          <ReturnButton onClick={() => setTrail(old => old + 1)}></ReturnButton>
        </ActionsForm>
        <ShowTrail trailState={[trail, setTrail]} trails={trailsObject.map((field) => field.icon)}></ShowTrail>
      </FormHeader>
      <FormContentWrapper ref={formRef}>
      <FormContent
          animate={{
            left: (-trail * 100) + '%'
          }
          }
      >
        {trailsObject.map((trail) => trail.content)}
        
  
      </FormContent>
      </FormContentWrapper>
    </Form>
  );
};

     {/* <ButtonSubmit type="submit">
          {!loading ? (
            "Anunciar"
          ) : (
            <ProgressUpload progress={totalProgress}></ProgressUpload>
          )}
        </ButtonSubmit> */}
export default FormImovel;
