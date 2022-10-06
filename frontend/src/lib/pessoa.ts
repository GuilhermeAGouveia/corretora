import {getAPIHTTPClient} from "../services/api";
import {Pessoa} from "./interfaces";
import FormPessoa, {IFormPessoa} from "../components/forms/FormPessoa";


export async function insertPessoa(
    pessoa: Pessoa,
    ctx?: any
): Promise<string> {
    const api = getAPIHTTPClient(ctx);
    const response = await api.post<string>("/pessoa", pessoa);
    return response.data;
}

export function parseFormPessoaToPessoa(
    formPessoa: IFormPessoa
): Pessoa {
    const {
        email,
        firstName,
        lastName,
        password,
        birthdate,
        street,
        city,
        state,
        district,
        cep,
        telefones

    } = formPessoa;

    const pessoa: Pessoa = {
        email: email as string,
        firstName: firstName as string,
        lastName: lastName as string,
        password: password as string,
        birthdate: birthdate as Date,
        address: `${street}, ${district}`,
        city: city as string,
        state: state as string,
        cep: cep as string,
        telefones: telefones as string[]
    } as Pessoa;

    return pessoa;
}
