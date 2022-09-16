import FormComponent from "./FormComponent";
import {FiUser} from "react-icons/all";
import Input from "../../../../Input";
import {useForm} from "react-hook-form";


const FormPessoa = () => {
    const {handleSubmit, control} = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    }

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

        },];


    return <FormComponent sections={sections} onSubmit={handleSubmit(onSubmit)}/>;
}