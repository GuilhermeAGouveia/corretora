import { Associado, PrismaClient } from "@prisma/client";
import {Service} from "../interfaces"

interface IdAssociado {
    cod_lct: string;
    name: string;
}

const prisma = new PrismaClient();

export default {
    count: async () => {
        const count = await prisma.associado.count();
        return count;
    },

    getByCod: async (cod: IdAssociado) => {
        try {
            const associado = await prisma.associado.findUnique({
                where: {
                    idAssociado: cod,
                },
            });
            return associado;
        } catch (error: any) {
            throw new Error(error);
        }
    },

    getAll: async () => {
        const associado = await prisma.associado.findMany();
        return associado;
    },

    insert: async (element: Associado) => {
        try {
            const associadoInsert = await prisma.associado.create({
                data: element,
            });
            return associadoInsert;
        } catch (error: any) {
            throw new Error(error);
        }
    },

    delete: async (cod: IdAssociado) => {
        try {
            const associado = await prisma.associado.delete({
                where: {
                    idAssociado: cod,
                },
            });
            return associado;
        } catch (error: any) {
            throw new Error(error);
        }
    }

} as Service<Associado, IdAssociado>;
