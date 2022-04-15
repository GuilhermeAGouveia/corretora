import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()
export default {
    countImovel: async (req: Request, res: Response) => {
        const count = await prisma.imovel.count()
        res.json(count);
    },
    default: async (req: Request, res: Response) => {
        res.send("Raiz para imóveis")
    },
    getAll: async (req: Request, res: Response) => {
        const imoveis = await prisma.imovel.findMany()
        res.json(imoveis)
    }
}