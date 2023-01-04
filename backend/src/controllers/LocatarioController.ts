import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {Controller} from "../interfaces"

const prisma = new PrismaClient();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.locatario.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para locatario");
  },
  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
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
    res.json(locatario);
  },
  getAll: async (req: Request, res: Response) => {
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

    res.json(locatario);
  },

  insert: async (req: Request, res: Response) => {
    res.status(404).send("Not supported");
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const locatario = await prisma.pessoa.deleteMany({
        where: {
          id: cod,
          Locatario: {
            cod_lct: cod,
          },
        },
      });

      return res.json(!!locatario.count);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
