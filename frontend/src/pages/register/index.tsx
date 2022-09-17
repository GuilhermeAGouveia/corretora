import Cadastrar from "../../components/Cadastrar";
import FormPessoa from "../../components/Page/imoveis/cadastrar/forms/FormPessoa";

function RegisterUser(){
    return (
        <Cadastrar title="Cadastrar" form={<FormPessoa/>}></Cadastrar>
    )
}

export default RegisterUser;