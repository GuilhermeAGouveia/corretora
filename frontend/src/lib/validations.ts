import * as yup from 'yup';

export const formPessoaSchema = yup.object().shape({
    email: yup.string().email().required("Email é obrigatório"),
    firstName: yup.string().required("Primeiro nome é obrigatório"),
    lastName: yup.string().required("Último nome é obrigatório"),
    passwordConfirmation: yup.string().min(8, "A senha deve conter mais de 8 caracteres").required("Confirmação de senha é obrigatória"),
    password: yup.string().equals([yup.ref('passwordConfirmation'), null], 'A senha e a confirmação de senha não coincidem').required(),
    birthdate: yup.date().required("Data de nascimento é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),
    telefones: yup.array().of(yup.string()).required("É necessário pelo menos um telefone"),
});