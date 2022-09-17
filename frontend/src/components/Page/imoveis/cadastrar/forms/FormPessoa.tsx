import FormComponent from "./FormComponent";
import Input from "../../../../InputReactHookForm";
import {useForm} from "react-hook-form";
import SelectReactHookForm, {SelectOption} from "../../../../SelectReactHookForm";
import {useEffect, useState} from "react";
import {getCidades, getEstados} from "../../../../../lib/externalData";
import {FiCheckCircle, FiMapPin, FiPhone, FiUser} from "react-icons/fi";


const FormPessoa = () => {
    const {handleSubmit, control} = useForm();
    const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
    const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
    const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades

    const onSubmit = (data: any) => {
        console.log(data);
    }

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

    const sections = [
        {
            description: "Dados pessoais",
            icon: FiUser,
            inputs: [
                <Input
                    name="firstName"
                    control={control}
                    key="firstName"
                    placeholder="Nome"
                    type="text"
                    required
                />,
                <Input
                    name="lastName"
                    control={control}
                    key="lastName"
                    placeholder="Sobrenome"
                    type="text"
                    required
                />,
                <Input
                    name={"birthDate"}
                    control={control}
                    key="birthDate"
                    placeholder="Data de nascimento"
                    type="date"
                    required
                />,
            ]
        },
        {
            description: "Telefones",
            icon: FiPhone,
            inputs: [
                <Input
                    name="phone"
                    control={control}
                    key="phone"
                    placeholder="Telefone"
                    type="tel"
                    required
                />
            ]
        },
        {
            description: "Endereço",
            icon: FiMapPin,
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
            ]

        },
        {
            description: "Enviar",
            icon: FiCheckCircle,
            inputs: [
                <button type="submit" key={"submitPessoa"}>
                    Enviar
                </button>
            ]

        }
    ];


    return <FormComponent sections={sections} onSubmit={handleSubmit(onSubmit)}/>;
}

export default FormPessoa;