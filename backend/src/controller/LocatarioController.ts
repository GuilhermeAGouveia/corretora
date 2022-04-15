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
            phones: true,
          },
        },
      },
    });

    res.json(locatario);
  },

  insert: async (req: Request, res: Response) => {
    const locatario = req.body as Locatario;

    const locatarioInsert = await pessoaInsert.insertLocatario(locatario);

    res.json(locatarioInsert.id);
  },
} as Controller;
