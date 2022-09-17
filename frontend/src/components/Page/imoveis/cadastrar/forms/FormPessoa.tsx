import FormComponent from "./FormComponent";
import Input from "../../../../InputReactHookForm";
import MultiInput from "../../../../MultiInputReactHookForm";
import {useForm} from "react-hook-form";
import SelectReactHookForm, {SelectOption} from "../../../../SelectReactHookForm";
import React, {useEffect, useState} from "react";
import {getCidades, getEstados} from "../../../../../lib/externalData";
import {FiCheckCircle, FiLock, FiMapPin, FiPhone, FiUser} from "react-icons/fi";
import {AlertType} from "../../../../../lib/interfaces";
import {yupResolver} from "@hookform/resolvers/yup";
import {formPessoaSchema} from "../../../../../lib/validations";
import BannerInfo, {useBannerInfo} from "../../../../BannerInfo";
import {insertPessoa, parseFormPessoaToPessoa} from "../../../../../lib/pessoa";


export interface IFormPessoa {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    birthdate: Date;
    street: string;
    number: string;
    city: string;
    state: string;
    district: string;
    telefones: string[];
    cep: string;
}

const FormPessoa = () => {
    const {alertState: [alert, setAlert], control: controlBannerInfo} = useBannerInfo()

    const {handleSubmit, control} = useForm({resolver: yupResolver(formPessoaSchema)});
    const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
    const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
    const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades


    const onSubmit = async (data: any) => {
        data = data as IFormPessoa;
        let pessoa = parseFormPessoaToPessoa(data);
        await insertPessoa(pessoa);
        setAlert({type: AlertType.SUCCESS, message: "Pessoa cadastrada com sucesso!"})
    }

    const onError = (errors: any) => {
        let keys = Object.keys(errors);
        let firstError = errors[keys[0]];
        setAlert({
            type: AlertType.ERROR,
            message: firstError?.message
        })
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

                />,
                <Input
                    name="lastName"
                    control={control}
                    key="lastName"
                    placeholder="Sobrenome"
                    type="text"

                />,
                <Input
                    name="email"
                    control={control}
                    key="email"
                    placeholder="Email"
                    type="email"

                />,
                ,
                <Input
                    name={"birthdate"}
                    control={control}
                    key="birthdate"
                    placeholder="Data de nascimento"
                    type="date"

                />,
            ]
        },
        {
            description: "Telefones",
            icon: FiPhone,
            inputs: [
                <MultiInput
                    name="telefones"
                    control={control}
                    key="phone"
                    placeholder="Telefone"
                    type="tel"
                    mask={"(99) 99999-9999"}

                />
            ]
        },
        {
            description: "Endereço",
            icon: FiMapPin,
            inputs: [
                <Input
                    name="cep"
                    control={control}
                    key="cep"
                    placeholder="CEP"
                    type="text"

                />,

                <Input key={"streetInput"} name="street" control={control} placeholder="Rua"/>,
                <Input
                    key={"numberInput"}
                    name="number"
                    type="number"
                    control={control}
                    placeholder="Número"

                />,
                <Input
                    key={"districtInput"}
                    name="district"
                    control={control}
                    placeholder="Bairro"

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

                ></SelectReactHookForm>
            ]

        },
        {
            description: "Segurança",
            icon: FiLock,
            inputs: [
                <Input
                    key={"passwordInput"}
                    name="password"
                    control={control}
                    placeholder="Senha"
                    type="password"

                />,
                <Input
                    key={"passwordConfirmationInput"}
                    name="passwordConfirmation"
                    control={control}
                    placeholder="Confirmação de senha"
                    type="password"

                />
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


    return <>
        <FormComponent sections={sections} onSubmit={handleSubmit(onSubmit, onError)}/>
        {alert && <BannerInfo type={alert.type} control={controlBannerInfo}>{alert.message}</BannerInfo>}
    </>;
}

export default FormPessoa;