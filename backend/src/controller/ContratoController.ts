import { Contrato, PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();

interface IdContrato {
    cod_cor: string;
    cod_lct: string;
    cod_imv: string;
}

export default {
    count: async (req: Request, res: Response) => {
        const count = await prisma.contrato.count();
        return res.json(count);
    },
    default: async (req: Request, res: Response) => {
        return res.send("Raiz para Contrato");
    },
    getByCod: async (req: Request, res: Response) => {
        try {
            const idContrato = req.query as any as IdContrato;
            const Contrato = await prisma.contrato.findUnique({
                where: {
                    idContrato
                },
            });

            return res.json(Contrato);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    },
    getAll: async (req: Request, res: Response) => {
        const Contrato = await prisma.contrato.findMany();

        return res.json(Contrato);
    },
    insert: async (req: Request, res: Response) => {
        try {
            const Contrato = req.body as Contrato;

            const ContratoInsert = await prisma.contrato.create({
                data: Contrato,
            });

            return res.json(ContratoInsert.cod_cor + "|" + ContratoInsert.cod_lct + "|" + ContratoInsert.cod_imv);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {

        const idContrato = req.query as any as IdContrato;

        const Contrato = await prisma.contrato.delete({
            where: {
                idContrato
            },
        });

        return res.json(Contrato);
        } catch (error: any) {
            switch (error.code) {
                case "P2025":
                    return res.status(400).json({ error: "Não é possível excluir um contrato que não existe" });
                default:
                    return res.status(500).json(error);
            }
        }

    }
} as Controller;