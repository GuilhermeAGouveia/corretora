import * as yup from 'yup';

const validatePhone = (phone?: string) => {
    if (!phone) return true;
    if (phone.length < 14) {
        return false;
    }
    return true;
};

export const formPessoaSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    firstName: yup.string().required("Primeiro nome é obrigatório"),
    lastName: yup.string().required("Último nome é obrigatório"),
    birthdate: yup.date().required("Data de nascimento é obrigatório"),
    telefones: yup.array().of(yup.string().test("valid-phone", "Telefone inválido", validatePhone)).min(1, "Pelo menos um telefone é obrigatório"),
    passwordConfirmation: yup.string().min(8, "A senha deve conter mais de 8 caracteres").required("Confirmação de senha é obrigatória"),
    password: yup.string().equals([yup.ref('passwordConfirmation'), null], 'A senha e a confirmação de senha não coincidem').required(),
    street: yup.string().required("Rua é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),

});

export const formImovelSchema = yup.object().shape({
    street: yup.string().required("Rua é obrigatório"),
    number: yup.number().required("Número é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    nApto: yup.number().nullable(),
    hasGarage: yup.boolean().nullable(),
    hasGarden: yup.boolean().nullable(),
    hasSuite: yup.boolean().nullable(),
    nRooms: yup.number().nullable(),
    nBathrooms: yup.number().nullable(),
    area: yup.number().nullable(),
    isFurnished: yup.string().nullable(),
    supDescribe: yup.string().nullable(),
    price: yup.number().moreThan(yup.ref('mensalidade'), "O preço deve ser maior que a mensalidade").nullable(),
    mensalidade: yup.number().nullable(),

});