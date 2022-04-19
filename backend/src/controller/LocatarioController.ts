import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Locatario } from "../utils/pessoa/interfaces";
import PessoaInsert from "../utils/pessoa/PessoaInsert";
import Controller from "./IController";

const prisma = new PrismaClient();

const pessoaInsert = new PessoaInsert();

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
    try {
      const locatario = req.body as Locatario;

      const locatarioInsert = await pessoaInsert.insertLocatario(locatario);

      res.json(locatarioInsert.id);
    } catch (error: any) {
      res.json(error);
    }
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
