import { AssociadoType, Pessoa } from "@prisma/client";

export interface PessoaWithTelefone extends Pessoa {
  telefones?: string[];
}

export interface Locador extends PessoaWithTelefone {
  is_partner: boolean;
}

export interface Corretor extends PessoaWithTelefone {
  score: number;
}

export interface Locatario extends PessoaWithTelefone {
  birthdate: Date;
  associados: Associado[];
}

export interface Associado {
  name: string;
  tipo: AssociadoType;
  birthdate?: Date;
}
