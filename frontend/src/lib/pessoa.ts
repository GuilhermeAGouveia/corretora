import { IFormPessoa } from "../components/forms/FormPessoa";
import { getAPIHTTPClient } from "../services/api";
import { Locador, Pessoa } from "./interfaces";


export async function insertPessoa(
    pessoa: Pessoa,
    ctx?: any
): Promise<string> {
    const api = getAPIHTTPClient(ctx);
    const response = await api.post<string>("/pessoa", pessoa);
    return response.data;
}

export async function getLocadorByCod(
    cod: string,
    ctx?: any
): Promise<Pessoa> {
    const api = getAPIHTTPClient(ctx);
    const response = await api.get<Locador>(`/locador/get/${cod}`);
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
        phones: telefones as string[]
    } as Pessoa;

    return pessoa;
}
