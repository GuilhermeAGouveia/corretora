import { Request, Response } from "express";
import associadoService from "../services/AssociadoService";
import {Controller} from "../interfaces"
import {Associado} from "@prisma/client";

interface IdAssociado {
  cod_lct: string;
  name: string;
}

export default {
  count: async (req: Request, res: Response) => {
    const count = await associadoService.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para associado");
  },
  getByCod: async (req: Request, res: Response) => {
    try {
      const idAssociado = req.query as any as IdAssociado;
      const associado = await associadoService.getByCod(idAssociado);
      res.json(associado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const associado = await associadoService.getAll();
    res.json(associado);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const associado = req.body as Associado;
      const associadoInsert = await associadoService.insert(associado);
      return res.json(associadoInsert.name);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const idAssociado = req.query as any as IdAssociado;
    const associado = await associadoService.delete(idAssociado);
    res.json(associado);
  },
} as Controller;
