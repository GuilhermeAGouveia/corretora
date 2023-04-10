import { Locador, PrismaClient } from "@prisma/client";
import {Service} from "../interfaces"


const prisma = new PrismaClient();

export default {
    count: async () => {
        const count = await prisma.locador.count();
        return count;
    },

    getByCod: async (cod: string) => {
        try {
            const locador = await prisma.locador.findUnique({
                where: {
                  cod_lcd: cod,
                },
                include: {
                  pessoa: {
                    include: {
                      phones: true,
                    },
                  },
                },
              });
            return locador;
        } catch (error: any) {
            throw new Error(error);
        }
    },

    getAll: async () => {
        const locador = await prisma.locador.findMany({
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
              imovel: {
                select: {
                  cod_imv: true,
                },
              },
            },
          });
        return locador;
    },

    insert: async (element: Locador) => {
        try {
            const locadorInsert = await prisma.locador.create({
                data: element,
            });
            return locadorInsert;
        } catch (error: any) {
            throw new Error(error.message || "Erro ao inserir locador");
        }
    },

    delete: async (cod: string) => {
        try {
            const locador = await prisma.locador.delete({
                where: {
                    cod_lcd: cod,
                },
            });
            return locador;
        } catch (error: any) {
            throw new Error(error.message || "Erro ao deletar locador");
        }
    }

} as Service<Locador, string>;
