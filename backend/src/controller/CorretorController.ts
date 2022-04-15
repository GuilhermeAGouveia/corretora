import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Corretor } from "../utils/pessoa/interfaces";
import PessoaInsert from "../utils/pessoa/PessoaInsert";
import Controller from "./IController";

const prisma = new PrismaClient();

const pessoaInsert = new PessoaInsert()

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
        cod_cor: cod
      },
      include: {
        pessoa: {
          include: {
            phones: true
          }
        }
      }
    });
  },
  getAll: async (req: Request, res: Response) => {
    const imoveis = await prisma.corretor.findMany({
        include: {
            pessoa: {
              include: {
                phones: true
              }
            }
        }
    });
    
    res.json(imoveis);
  },
  
  insert: async (req: Request, res: Response) => {
    const corretor = req.body as Corretor;

    const corretorInsert = await pessoaInsert.insertCorretor(corretor)

    res.json(corretorInsert.id);
  },
} as Controller;
