import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import encrypt from "../utils/encrypt";
import { PessoaWithTelefone } from "../utils/pessoa/interfaces";
import {Controller} from "../interfaces"

const prisma = new PrismaClient();

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.pessoa.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para pessoa");
  },
  getByCod: async (req: Request, res: Response) => {
    const id: string = req.params.cod;
    const pessoa = await prisma.pessoa.findUnique({
      where: {
        id,
      },
    });
    res.json(pessoa);
  },
  getAll: async (req: Request, res: Response) => {
    const pessoa = await prisma.pessoa.findMany({
      include: {
        phones: {
          select: {
            numero: true,
          },
        },
      },
    });

    res.json(pessoa);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const { telefones, ...pessoa } = req.body as PessoaWithTelefone;

      pessoa.password = await encrypt.hash(pessoa.password);

      const phones = telefones
        ? {
            createMany: {
              data: telefones.map((telefone) => ({
                numero: telefone,
              })),
              skipDuplicates: true,
            },
          }
        : undefined;

      const insertPessoa = await prisma.pessoa.create({
        data: { ...pessoa, phones },
      });

      const insertLocador = prisma.locador.create({
        data: {
          pessoa: {
            connect: {
              id: insertPessoa.id,
            },
          },
        },
      });

      const insertLocatario = prisma.locatario.create({
        data: {
          pessoa: {
            connect: {
              id: insertPessoa.id,
            },
          },
        },
      });

      await prisma.$transaction([insertLocador, insertLocatario]);

      res.json(insertPessoa.id);
    } catch (error: any) {
      console.log(error)
        res.status(500).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const pessoa = await prisma.pessoa.deleteMany({
        where: {
          id: cod,
        },
      });

      return res.json(!!pessoa.count);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
