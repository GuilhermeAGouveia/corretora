import { Locatario, PrismaClient } from "@prisma/client";
import {Service} from "../interfaces"


const prisma = new PrismaClient();

export default {
    count: async () => {
        const count = await prisma.locatario.count();
        return count;
    },

    getByCod: async (cod: string) => {
        try {
            const locatario = await prisma.locatario.findUnique({
              where: {
                cod_lct: cod,
              },
              include: {
                pessoa: {
                  include: {
                    phones: true,
                  },
                },
              },
            });
            return locatario;
        } catch (error: any) {
            throw new Error(error);
        }
    },

    getAll: async () => {
        const locatario = await prisma.locatario.findMany({
          include: {
            pessoa: {
              include: {
                phones: {
                  select: {
                    numero: true,
                  },
                },
              },
            },
            associados: {
              select: {
                name: true,
                tipo: true,
                birthdate: true,
              },
            },
          },
        });
        return locatario;
    },

    insert: async (element: Locatario) => {
        try {
            const locatarioInsert = await prisma.locatario.create({
                data: element,
            });
            return locatarioInsert;
        } catch (error: any) {
            throw new Error(error.message || "Erro ao inserir locatario");
        }
    },

    delete: async (cod: string) => {
        try {
            const locatario = await prisma.locatario.delete({
                where: {
                    cod_lct: cod,
                },
            });
            return locatario;
        } catch (error: any) {
            throw new Error(error);
        }
    }

} as Service<Locatario, string>;
