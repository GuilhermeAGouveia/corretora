import { PrismaClient } from "@prisma/client";
import { Corretor, Locador, Locatario, PessoaWithTelefone } from "./interfaces";

interface AdditionalData {
  Locador?: {
    create: {
      is_partner: boolean;
    };
  };
  Locatario?: {
    create: {
      birthdate: Date;
    };
  };
  Corretor?: {
    create: {
      score: number;
    };
  };
}
//Essa classe existe para tratar a herança na inserção, coisa que o prisma infelizmente não suporta ainda
class PessoaInheritanceInsert {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async insertPessoa({
    telefones,
    additionalData,
    ...pessoa
  }: PessoaWithTelefone & { additionalData?: AdditionalData }) {
    const phones = telefones
      ? {
          createMany: {
            data: telefones.map((telefone) => ({
              numero: telefone,
            })),
            skipDuplicates: true,
          },
        }
      : undefined;

    const pessoaInsert = await this.prisma.pessoa.create({
      data: {
        ...pessoa,
        phones,
        ...additionalData,
      },
    });

    return pessoaInsert;
  }
  async insertLocador({ is_partner, ...pessoaWithTelefone }: Locador) {
    const additionalData: AdditionalData = {
      Locador: {
        create: {
          is_partner,
        },
      },
    };

    const pessoa = await this.insertPessoa({
      ...pessoaWithTelefone,
      additionalData,
    });

    return pessoa;
  }

  async insertCorretor({ score, ...pessoaWithTelefone }: Corretor) {
    const additionalData: AdditionalData = {
      Corretor: {
        create: {
          score,
        },
      },
    };

    const pessoa = await this.insertPessoa({
      ...pessoaWithTelefone,
      additionalData,
    });

    return pessoa;
  }

  async insertLocatario({ birthdate, ...pessoaWithTelefone }: Locatario) {
    const additionalData: AdditionalData = {
      Locatario: {
        create: {
          birthdate,
        },
      },
    };

    const pessoa = await this.insertPessoa({
      ...pessoaWithTelefone,
      additionalData,
    });

    return pessoa;
  }
}

export default PessoaInheritanceInsert;
