import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Corretor } from "../utils/pessoa/interfaces";
import PessoaInsert from "../utils/pessoa/PessoaInsert";
import Controller from "./IController";

const prisma = new PrismaClient();

const pessoaInsert = new PessoaInsert();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.corretor.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para corretor");
  },
  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const corretor = await prisma.corretor.findUnique({
      where: {
        cod_cor: cod,
      },
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

    res.json(corretor);
  },
  getAll: async (req: Request, res: Response) => {
    const corretor = await prisma.corretor.findMany({
      include: {
        pessoa: {
          include: {
            phones: true,
          },
        },
      },
    });

    res.json(corretor);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const corretor = req.body as Corretor;

      const corretorInsert = await pessoaInsert.insertCorretor(corretor);

      res.json(corretorInsert.id);
    } catch (error: any) {
      res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const corretor = await prisma.pessoa.deleteMany({
        where: {
          id: cod,
          Corretor: {
            cod_cor: cod,
          },
        },
      });

      return res.json(!!corretor.count);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
