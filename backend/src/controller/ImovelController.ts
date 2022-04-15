import { Imovel, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient()
export default {
    count: async (req: Request, res: Response) => {
        const count = await prisma.imovel.count()
        res.json(count);
    },
    default: async (req: Request, res: Response) => {
        res.send("Raiz para imóveis")
    },
    
    getByCod: async (req: Request, res: Response) => {
        const cod: string = req.params.cod;
        const locador = await prisma.imovel.findUnique({
          where: {
            cod_imv: cod
          },
          include: {
            locador: true
          }
        });
    },
    
    getAll: async (req: Request, res: Response) => {
        const imoveis = await prisma.imovel.findMany()
        res.json(imoveis)
    },

    insert: async (req: Request, res: Response) => {
        const imovel = req.body as Imovel
        const imovelInsert = await prisma.imovel.create({
            data: {
                ...imovel
            }
        })
        res.json(imovelInsert.cod_imv)
    },
} as Controller