import { Request, Response } from "express";
import {Controller} from "../interfaces"
import handleErrorPrisma from "../handleErrorPrisma";

import telefoneService from "../services/TelefoneService";

export default {
  count: async (req: Request, res: Response) => {
    const count = await telefoneService.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para telefone");
  },
  getByCod: async (req: Request, res: Response) => {
    try {
      const idTelefone = req.query as any;
      const telefone = await telefoneService.getByCod(idTelefone);
      res.json(telefone);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const telefone = await telefoneService.getAll();

    res.json(telefone);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const telefone = req.body as any;

      const telefoneInsert = await telefoneService.insert(telefone);

      return res.status(201).json(telefoneInsert);
    } catch (error: any) {
      return res.status(400).json(handleErrorPrisma(error));
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const idTelefone = req.query as any;

      const telefone = await telefoneService.delete(idTelefone);

      res.json(telefone);
    } catch (error: any) {
      res.status(500).json(handleErrorPrisma(error));
    }
  },
} as Controller;
