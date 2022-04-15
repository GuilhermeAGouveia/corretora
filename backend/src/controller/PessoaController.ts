import { Pessoa, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface Pessoa_Telefone {
  pessoa: Pessoa;
  telefones?: string[];
}
const prisma = new PrismaClient();
export default {
  countPessoa: async (req: Request, res: Response) => {
    const count = await prisma.pessoa.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para pessoa");
  },
  getAll: async (req: Request, res: Response) => {
    const imoveis = await prisma.pessoa.findMany({
        include: {
            phones: true
        }
    });
    
    res.json(imoveis);
  },
  insert: async (req: Request, res: Response) => {
    const { pessoa, telefones } = req.body as Pessoa_Telefone;

    const phones = telefones
      ? {
          createMany: {
            data: telefones.map((telefone) => ({
              numero: telefone,
            })),
            skipDuplicates: true
          },
          
        }
      : undefined;

    const pessoaInsert = await prisma.pessoa.create({
      data: {
        ...pessoa,
        phones,
      },
    });

    res.json(pessoaInsert.id);
  },
};
