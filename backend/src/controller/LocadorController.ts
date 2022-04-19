import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Locador } from "../utils/pessoa/interfaces";
import PessoaInsert from "../utils/pessoa/PessoaInsert";
import Controller from "./IController";

const prisma = new PrismaClient();

const pessoaInsert = new PessoaInsert();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.locador.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para locador");
  },
  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
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
    res.json(locador);
  },
  getAll: async (req: Request, res: Response) => {
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
      },
    });

    res.json(locador);
  },
  insert: async (req: Request, res: Response) => {
    try {
      const locador = req.body as Locador;

      const locadorInsert = await pessoaInsert.insertLocador(locador);

      res.json(locadorInsert.id);
    } catch (error: any) {
      res.json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const locador = await prisma.pessoa.deleteMany({
        where: {
          id: cod,
          Locador: {
            cod_lcd: cod,
          },
        },
      });

      return res.json(!!locador.count);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
