import { Pessoa, PrismaClient } from "@prisma/client";
import { Service } from "../interfaces";
import encrypt from "../utils/encrypt";
import { PessoaWithTelefone } from "../utils/pessoa/interfaces";

const prisma = new PrismaClient();

export default {
  count: async () => {
    const count = await prisma.pessoa.count();
    return count;
  },

  getByCod: async (cod: string) => {
    try {
      const pessoa = await prisma.pessoa.findUnique({
        where: {
          id: cod,
        },
        include: {
          phones: {
            select: {
              numero: true,
            },
          },
        },
      });
      return pessoa as PessoaWithTelefone;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getAll: async () => {
    const pessoas = await prisma.pessoa.findMany({
      include: {
        phones: {
          select: {
            numero: true,
          },
        },
      },
    });
    return pessoas as PessoaWithTelefone[];
  },

  insert: async (element: PessoaWithTelefone) => {
    try {
      element.password = await encrypt.hash(element.password);

      const phones = element.phones
        ? {
            createMany: {
              data: element.phones.map((telefone) => ({
                numero: telefone.numero,
              })),
              skipDuplicates: true,
            },
          }
        : undefined;

      const insertPessoa = await prisma.pessoa.create({
        data: { ...element, phones },
        include: {
          phones: {
            select: {
              numero: true,
            },
          },
        },
      });

      const insertLocador = prisma.locador.create({
        data: {
          pessoa: {
            connect: {
              id: insertPessoa.id,
            },
          },
        },
      });

      const insertLocatario = prisma.locatario.create({
        data: {
          pessoa: {
            connect: {
              id: insertPessoa.id,
            },
          },
        },
      });

      await prisma.$transaction([insertLocador, insertLocatario]);

      return insertPessoa;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao inserir pessoa");
    }
  },

  delete: async (cod: string) => {
    try {
      const pessoa = await prisma.pessoa.delete({
        where: {
          id: cod,
        },
      });
      return pessoa;
    } catch (error: any) {
      throw new Error(error.message || "Erro ao deletar pessoa");
    }
  },
} as Service<PessoaWithTelefone, string>;
