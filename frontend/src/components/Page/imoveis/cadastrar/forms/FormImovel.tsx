import {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {FiAlignLeft, FiCheck, FiDollarSign, FiImage} from "react-icons/fi";
import {useAuth} from "../../../../../context/Auth";
import {getAditionalFields} from "../../../../../lib/aditionalFields";
import {getCidades, getEstados} from "../../../../../lib/externalData";
import {insertManyImages} from "../../../../../lib/imagem";
import {insertImovel, parseFormImovelToIImovel} from "../../../../../lib/imovel";
import {ImovelType, LevelFurnished} from "../../../../../lib/interfaces";
import ImageUploader, {UploadedFile} from "../../../../ImageUploader";
import Input from "../../../../InputReactHookForm";
import SelectReactHookForm, {SelectOption} from "../../../../SelectReactHookForm";
import {ButtonSubmit, SubmitContainer} from "./styles";
import FormComponent from "./FormComponent";
import Lottie from "react-lottie";
import animationData from "../../../../../assets/lotties/checked.json";
import ProgressUpload from "../../../../ProgressUpload";
import colors from "../../../../../styles/colors";

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
    furnished?: LevelFurnished;
}

interface FormImovelProps {
    imovelType: ImovelType;
}

const FormImovel = ({imovelType}: FormImovelProps) => {
    //const formRef = useRef<HTMLFormElement>(null);
    const {user} = useAuth();
    const {control, handleSubmit} = useForm();
    const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
    const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
    const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades
    const [imagens, setImagens] = useState<UploadedFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [finalAnimationConfirm, setfinalAnimationConfirm] = useState(false);
    const [totalProgress, setTotalProgress] = useState(0);

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
        console.log(formValues);

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
        console.log("FormImovel - Render");
        setEstadosFromExternalData()
    }, []);

    const sections = useCallback(
        () => [
            {
                description: "Informações básicas",
                icon: FiAlignLeft,
                inputs: [
                    <Input key={"streetInput"} name="street" control={control} placeholder="Rua" required/>,
                    <Input
                        key={"numberInput"}
                        name="number"
                        type="number"
                        control={control}
                        placeholder="Número"
                        required
                    />,
                    <Input
                        key={"districtInput"}
                        name="district"
                        control={control}
                        placeholder="Bairro"
                        required
                    />,
                    <SelectReactHookForm
                        key={"stateSelect"}
                        style={{
                            maxWidth: "400px",
                        }}
                        name="state"
                        placeholder="Estado"
                        options={estados}
                        controlReactHookForm={control}
                        onChange={(value) => setEstado(value)}
                        required
                    ></SelectReactHookForm>,
                    <SelectReactHookForm
                        key={"citySelect"}
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
                ],
            },
            {
                description: "Insira suas imagens",
                icon: FiImage,
                inputs: [
                    <ImageUploader key={"imageUpload"} uploaded={[imagens, setImagens]}/>
                ]
            },
            {
                description: "Informações adicionais",
                icon: FiAlignLeft,
                inputs: [
                    <Input
                        key={"aptoInput"}
                        name="area"
                        type="number"
                        control={control}
                        placeholder="Área (m²)"
                        defaultValue={0}
                    />,
                    ...getAditionalFields(imovelType).map((field) => {
                        if (field.componentType === "input")
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
                        if (field.componentType === "select")
                            return (
                                <SelectReactHookForm
                                    style={{
                                        maxWidth: "400px"
                                    }}
                                    key={field.name}
                                    name={field.name}
                                    options={field.options as []}
                                    controlReactHookForm={control}
                                    placeholder={field.placeholder}
                                    value={field.defaultValue as string | undefined}
                                />
                            );
                    })
                ]
            },


            {
                description: "Quanto vai custar?",

                icon: FiDollarSign,
                inputs: [

                    <Input
                        key={"mensalidadeInput"}
                        name="mensalidade"
                        type="number"
                        control={control}
                        placeholder="Mensalidade (R$)"
                        defaultValue={0}
                    />,
                    <Input
                        key={"priceInput"}
                        name="price"
                        type="number"
                        control={control}
                        placeholder="Preço de venda (R$)"
                        defaultValue={0}
                    />,
                ],
            },
            {
                description: "Finalizar",
                icon: FiCheck,
                inputs: [
                    <SubmitContainer
                        key={"submitContainer"}
                    >
                        {totalProgress !== 100 && !loading && (
                            <ButtonSubmit
                                type="submit"
                                //onClick={formRef.current?.submitForm}
                            >
                                Anunciar
                            </ButtonSubmit>
                        )}
                        {totalProgress !== 100 &&
                            loading && ( //Exibe este componente enquanto o a imagem nã
                                <ProgressUpload
                                    circleSize={60}
                                    progress={totalProgress}
                                    strokeColor={colors.primary}
                                    textColor={colors.primary}
                                ></ProgressUpload>
                            )}

                        {totalProgress === 100 && !finalAnimationConfirm && ( //Exibe esta animação lottie apenas quando load completar
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
                                        callback: () => setfinalAnimationConfirm(true),
                                    },
                                ]}
                            />
                        )}

                        {finalAnimationConfirm && ( //Exibe este componente apenas quando o cadastro estiver totalmente completo
                            <Link href={"/lista"}>Voltar a pagina inicial</Link>
                        )}
                    </SubmitContainer>
                ]
            }
        ],
        [cidades, estados, imagens, imovelType, control, loading, totalProgress, finalAnimationConfirm]
    );

    return <FormComponent sections={sections()} onSubmit={handleSubmit(onSubmit)}/>
};

export default FormImovel;
