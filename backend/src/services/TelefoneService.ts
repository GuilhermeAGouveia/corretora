import { Telefone } from "@prisma/client";
import { Service } from "../interfaces";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface IdTelefone {
  numero: string;
  idPessoa: string;
}

export default {
  getAll: async () => {
    return await prisma.telefone.findMany();
  },

  count: async () => {
    return await prisma.telefone.count();
  },
  getByCod: async (idTelefone: IdTelefone) => {
    return await prisma.telefone.findUnique({
      where: {
        idTelefone,
      },
    });
  },
  insert: async (telefone: Telefone) => {
    try {
      return await prisma.telefone.create({
        data: telefone,
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message || "Erro ao inserir telefone");
    }
  },
  delete: async (idTelefone: IdTelefone) => {
    try {
      return await prisma.telefone.delete({
        where: {
          idTelefone,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message || "Erro ao deletar telefone");
    }
  },
} as Service<Telefone, IdTelefone>;
