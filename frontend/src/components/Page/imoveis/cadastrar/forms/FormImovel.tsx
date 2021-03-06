import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiAlignLeft,
  FiCheck,
  FiChevronLeft,
  FiDollarSign,
  FiImage,
} from "react-icons/fi";
import animationData from "../../../../../assets/lotties/checked.json";
import { useAuth } from "../../../../../context/Auth";
import { Field, getAditionalFields } from "../../../../../lib/aditionalFields";
import { getCidades, getEstados } from "../../../../../lib/externalData";
import { insertManyImages } from "../../../../../lib/imagem";
import Lottie from "react-lottie";
import {
  insertImovel,
  parseFormImovelToIImovel,
} from "../../../../../lib/imovel";
import { ImovelType } from "../../../../../lib/interfaces";
import colors from "../../../../../styles/colors";
import ImageUploader, { UploadedFile } from "../../../../ImageUploader";
import Input from "../../../../Input";
import ProgressUpload from "../../../../ProgressUpload";
import SelectReactHookForm, {
  SelectOption,
} from "../../../../SelectReactHookForm";
import ShowTrail from "./component/ShowTrail";
import {
  ActionsForm,
  AreaShow,
  ButtonSubmit,
  Form,
  FormContent,
  FormContentWrapper,
  FormHeader,
  ReturnButton,
  SectionInputContent,
  SubmitContainer,
} from "./styles";
import Link from "next/link";

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
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuth();
  const { handleSubmit, control } = useForm();
  const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
  const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
  const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades
  const [imagens, setImagens] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [completeRegister, setCompleteRegister] = useState(false);
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
      if (!imagem.progress) break; //[Otimizacao] O array de imagens ?? processado sequenciamente, ent??o se em algum momento o progress for 0, n??o precisa continuar o loop
      totalProgress += imagem.progress * imagem.file.size;
    }
    return totalSize ? Math.round(totalProgress / totalSize) : 0; // O tern??rio evita divis??o por zero
  }, []);

  const onSubmit = async (formValues: FormImovel) => {
    if (!user || loading) return; //se o usu??rio n??o estiver logado ou o form estiver carregando, n??o faz nada

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

  const trailsObject = useMemo(
    () => [
      {
        description: "Informa????es b??sicas",
        icon: FiAlignLeft,
        content: (
          <SectionInputContent>
            <Input name="street" control={control} placeholder="Rua" required />
            <Input
              name="number"
              type="number"
              control={control}
              placeholder="N??mero"
              required
            />
            <Input
              name="district"
              control={control}
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
        ),
      },
      {
        description: "Insira suas imagens",
        icon: FiImage,
        content: (
          <SectionInputContent>
            <ImageUploader uploaded={[imagens, setImagens]} />
          </SectionInputContent>
        ),
      },
      {
        description: "Informa????es adicionais",
        icon: FiAlignLeft,
        content: (
          <SectionInputContent>
            <Input
              name="area"
              type="number"
              control={control}
              placeholder="??rea (m??)"
              defaultValue={0}
            />
            {getAditionalFields(imovelType).map((field) => {
              return (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  control={control}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                />
              );
            })}
          </SectionInputContent>
        ),
      },
      {
        description: "Quanto vai custar?",

        icon: FiDollarSign,
        content: (
          <SectionInputContent>
            <Input
              name="mensalidade"
              type="number"
              control={control}
              placeholder="Mensalidade (R$)"
              defaultValue={0}
            />
            <Input
              name="price"
              type="number"
              control={control}
              placeholder="Pre??o de venda (R$)"
              defaultValue={0}
            />
          </SectionInputContent>
        ),
      },
    ],
    [cidades, estados, imagens, imovelType, control]
  );

  useEffect(() => {
    if (trail < 0) {
      setTrail(0);
    }

    if (trail > trailsObject.length) {
      setTrail(trail - 1);
    }
  }, [trail, trailsObject]);

  return (
    <Form>
      <FormHeader>
        <ActionsForm>
          <ReturnButton onClick={() => setTrail((old) => old - 1)}>
            <FiChevronLeft size={20} color={colors.primary} />
          </ReturnButton>
          <AreaShow>
            {trailsObject.map((trail) => trail.description)[trail]}
          </AreaShow>
          <ReturnButton onClick={() => setTrail((old) => old + 1)}>
            <FiCheck size={20} color={colors.primary} />
          </ReturnButton>
        </ActionsForm>
        <ShowTrail
          trailState={[trail, setTrail]}
          trails={trailsObject.map((field) => field.icon)}
        ></ShowTrail>
      </FormHeader>
      <FormContentWrapper>
        <FormContent
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          animate={{
            left: -trail * 100 + "%",
          }}
        >
          {trailsObject.map((trail) => trail.content)}
          <SectionInputContent>
            <SubmitContainer>
              {totalProgress !== 100 ? (
                !loading ? (
                  <ButtonSubmit
                    type="submit"
                    onClick={formRef.current?.submitForm}
                  >
                    Anunciar
                  </ButtonSubmit>
                ) : (
                  <ProgressUpload
                    circleSize={60}
                    progress={totalProgress}
                    strokeColor={colors.primary}
                    textColor={colors.primary}
                  ></ProgressUpload>
                )
              ) : !completeRegister && (
                <Lottie
                  options={{
                    loop: false,
                    autoplay: true,

                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  width={200}
                  height={200}
                  eventListeners={[
                    {
                      eventName: "complete",
                      callback: () => setCompleteRegister(true),
                    },
                  ]}
                />
              )}
              {completeRegister && <Link href={"/lista"}>Voltar a pagina inicial</Link>}
            </SubmitContainer>
          </SectionInputContent>
        </FormContent>
      </FormContentWrapper>
    </Form>
  );
};

export default FormImovel;
