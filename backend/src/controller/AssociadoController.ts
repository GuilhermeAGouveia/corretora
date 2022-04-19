import { Associado, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

interface IdAssociado {
  cod_lct: string;
  name: string;
}

const prisma = new PrismaClient();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.associado.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para associado");
  },
  getByCod: async (req: Request, res: Response) => {
    try {
      const idAssociado = req.query as any as IdAssociado;
      const associado = await prisma.associado.findUnique({
        where: {
          idAssociado,
        },
      });

      res.json(associado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const associado = await prisma.associado.findMany();

    res.json(associado);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const associado = req.body as Associado;

      const associadoInsert = await prisma.associado.create({
        data: associado,
      });

      return res.json(associadoInsert.name);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const idAssociado = req.query as any as IdAssociado;

    const associado = await prisma.associado.delete({
      where: {
        idAssociado,
      },
    });

    res.json(associado);
  },
} as Controller;
