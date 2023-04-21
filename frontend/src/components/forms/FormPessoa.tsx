import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import { getCidades, getEstados } from "../../lib/externalData";
import { AlertType } from "../../lib/interfaces";
import { insertPessoa, parseFormPessoaToPessoa } from "../../lib/pessoa";
import { formPessoaSchema } from "../../lib/validations";
import BannerInfo, { useBannerInfo } from "../BannerInfo";
import Input from "../InputReactHookForm";
import MultiInput from "../MultiInputReactHookForm";
import SelectReactHookForm, { SelectOption } from "../SelectReactHookForm";
import FormComponent from "./FormComponent";
import { ButtonSubmit, SubmitContainer } from "./styles";
import { tr } from "date-fns/locale";

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
  const { setMessage, control: controlBannerInfo } = useBannerInfo();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(formPessoaSchema),
  });
  const [estados, setEstados] = useState<SelectOption[]>([]); //usado pelo select de estados
  const [estado, setEstado] = useState<string>(); //  //usado pelo select de cidades para determinar de qual estado buscar cidades
  const [cidades, setCidades] = useState<SelectOption[]>([]); //usado pelo select de cidades

  const onSubmit = async (data: any) => {
    try {
      data = data as IFormPessoa;
      let pessoa = parseFormPessoaToPessoa(data);
      await insertPessoa(pessoa);
      setMessage("Pessoa cadastrada com sucesso!", AlertType.SUCCESS);
    } catch (e) {
      onError(e);
    }
  };

  const onError = (errors: any) => {
    let keys = Object.keys(errors);
    function getMessageInJsonRecursive(obj: any): string {
      for (let key of Object.keys(obj)) {
        if (typeof obj[key] === "object") {
          return getMessageInJsonRecursive(obj[key]);
        } else {
          if (key.toLowerCase().includes("message")) {
            return obj[key];
          }
        }
      }

      return "Erro ao inserir usuário";
    }

    let message = getMessageInJsonRecursive(errors);
    setMessage(message, AlertType.ERROR);
  };

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
    setEstadosFromExternalData();
  }, []);

  const sections = [
    {
      description: "Dados pessoais",
      icon: PersonIcon,
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
      ],
    },
    {
      description: "Telefones",
      icon: LocalPhoneIcon,
      inputs: [
        <MultiInput
          name="telefones"
          control={control}
          key="phone"
          placeholder="Telefone"
          type="tel"
          mask={"(99) 99999-9999"}
        />,
      ],
    },
    {
      description: "Endereço",
      icon: AddLocationAltIcon,
      inputs: [
        <Input
          name="cep"
          control={control}
          key="cep"
          placeholder="CEP"
          type="text"
          mask={"99999-999"}
        />,

        <Input
          key={"streetInput"}
          name="street"
          control={control}
          placeholder="Rua"
        />,
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
        ></SelectReactHookForm>,
      ],
    },
    {
      description: "Segurança",
      icon: LockIcon,
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
        />,
      ],
    },
    {
      description: "Enviar",
      icon: CheckCircleIcon,
      inputs: [
        <SubmitContainer key={"submitPessoa"}>
          <ButtonSubmit type="submit">Enviar</ButtonSubmit>
        </SubmitContainer>,
      ],
    },
  ];

  return (
    <>
      <FormComponent
        sections={sections}
        onSubmit={handleSubmit(onSubmit, onError)}
      />
      <BannerInfo control={controlBannerInfo} />
    </>
  );
};

export default FormPessoa;
