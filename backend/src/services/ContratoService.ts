import { Contrato, PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import {Service} from "../interfaces"

const prisma = new PrismaClient();

interface IdContrato {
    cod_cor: string;
    cod_lct: string;
    cod_imv: string;
}

export default {
    count: async () => {
        const count = await prisma.contrato.count();
        return count;
    },
    getByCod: async (cod) => {
        try {
            const contrato = await prisma.contrato.findUnique({
                where: {
                    idContrato: cod
                },
            });

            return contrato
        } catch (error: any) {
            throw new Error(error.message || "Erro ao buscar contrato");
        }
    },
    getAll: async () => {
        const contrato = await prisma.contrato.findMany();

        return contrato;
    },
    insert: async (element) => {
        try {
            const contratoInsert = await prisma.contrato.create({
                data: element,
            });

            return contratoInsert
        } catch (error: any) {
            throw new Error(error.message || "Erro ao inserir contrato");
        }
    },
    delete: async (cod) => {
        try {
            const contrato = await prisma.contrato.delete({
                where: {
                    idContrato: cod,
                },
            });

            return contrato
        } catch (error: any) {
            const messages = {
                "P2025": "Não é possível excluir um contrato que não existe",
                "P2003": "Não é possível excluir um contrato que possui um ou mais pagamentos",
            } as {
                [key: string]: string;
            }

            throw new Error(messages[error.code || "default"]);
        }

    }
} as Service<Contrato, IdContrato>;