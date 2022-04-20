import { Imovel, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();
export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.imovel.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para imóveis");
  },

  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const imovel = await prisma.imovel.findUnique({
      where: {
        cod_imv: cod,
      },
      include: {
        locador: true,
        images: {
          select: {
            url: true,
            originalname: true,
            size: true,
          },
        },
      },
    });

    return res.json(imovel);
  },

  getAll: async (req: Request, res: Response) => {
    const imoveis = await prisma.imovel.findMany({
      include: {
        images: {
          select: {
            url: true,
            originalname: true,
            size: true,
          },
        },
      }
    });
    res.json(imoveis);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const imovel = req.body as Imovel;
      const imovelInsert = await prisma.imovel.create({
        data: {
          ...imovel,
        },
      });
      res.json(imovelInsert.cod_imv);
    } catch (error: any) {
      res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const imovel = await prisma.imovel.delete({
      where: {
        cod_imv: cod,
      },
    });
    res.json(imovel);
  },
} as Controller;
