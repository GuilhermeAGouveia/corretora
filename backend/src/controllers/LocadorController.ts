import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {Controller} from "../interfaces"

import locadorService from "../services/LocadorService";

export default {
  count: async (req: Request, res: Response) => {
    const count = await locadorService.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para locador");
  },
  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const locador = await locadorService.getByCod(cod);
    res.json(locador);
  },
  getAll: async (req: Request, res: Response) => {
    const locador = await locadorService.getAll();

    res.json(locador);
  },
  insert: async (req: Request, res: Response) => {
    res.status(404).send("Not supported");
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const locador = await locadorService.delete(cod);

      return res.json(locador);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
