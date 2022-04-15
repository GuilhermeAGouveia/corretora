import { Pessoa } from "@prisma/client";


export interface PessoaWithTelefone extends Pessoa {
    telefones?: string[];
}

export interface Locador extends PessoaWithTelefone  {
    is_partner: boolean;
}

export interface Corretor extends PessoaWithTelefone  {
    score: number;
}

export interface Locatario extends PessoaWithTelefone  {
    birthdate: Date;
}
