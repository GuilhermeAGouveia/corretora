import { PrismaClient, Telefone } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.telefone.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para telefone");
  },
  getByCod: async (req: Request, res: Response) => {
    try {
      const idTelefone = req.query as any as Telefone;
      const telefone = await prisma.telefone.findUnique({
        where: {
          idTelefone,
        },
      });

      res.json(telefone);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const telefone = await prisma.telefone.findMany();

    res.json(telefone);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const telefone = req.body as Telefone;

      const telefoneInsert = await prisma.telefone.create({
        data: telefone,
      });

      return res.json(telefoneInsert.pessoaId);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const idTelefone = req.query as any as Telefone;

      const telefone = await prisma.telefone.delete({
        where: {
          idTelefone,
        },
      });

      res.json(telefone);
    } catch (error: any) {
      switch (error.code) {
        case "P2025":
          return res.status(400).json({
            error: "Não é possível deletar um telefone que não está cadastrado",
          });
        default:
          res.status(500).json(error);
      }
    }
  },
} as Controller;
