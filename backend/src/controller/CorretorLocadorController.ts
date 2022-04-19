import { Corretor_Locador, PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();

interface IdCorretor_Locador {
    cod_cor: string;
    cod_lcd: string;
}

export default {
    count: async (req: Request, res: Response) => {
        const count = await prisma.corretor_Locador.count();
        return res.json(count);
    },
    default: async (req: Request, res: Response) => {
        return res.send("Raiz para corretor_Locador");
    },
    getByCod: async (req: Request, res: Response) => {
        try {
            const idCorretorLocador = req.query as any as IdCorretor_Locador;
            const corretor_Locador = await prisma.corretor_Locador.findUnique({
                where: {
                    idCorretorLocador
                },
            });

            return res.json(corretor_Locador);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    },
    getAll: async (req: Request, res: Response) => {
        const corretor_Locador = await prisma.corretor_Locador.findMany();

        return res.json(corretor_Locador);
    },
    insert: async (req: Request, res: Response) => {
        try {
            const corretor_Locador = req.body as Corretor_Locador;

            const corretor_LocadorInsert = await prisma.corretor_Locador.create({
                data: corretor_Locador,
            });

            return res.json(corretor_LocadorInsert.cod_cor + "|" + corretor_LocadorInsert.cod_lcd);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {

        const idCorretorLocador = req.query as any as IdCorretor_Locador;

        const corretor_Locador = await prisma.corretor_Locador.delete({
            where: {
                idCorretorLocador
            },
        });

        return res.json(corretor_Locador);
        } catch (error: any) {
            switch (error.code) {
                case "P2025":
                    return res.status(400).json({ error: "Não é possível excluir um corretor_Locador que não existe" });
                default:
                    return res.status(500).json(error);
            }
        }

    }
} as Controller;