import Cadastrar from "../../components/Cadastrar";
import FormPessoa from "../../components/forms/FormPessoa";

function RegisterUser(){
    return (
        <Cadastrar title="Cadastrar" form={<FormPessoa/>}></Cadastrar>
    )
}

export default RegisterUser;