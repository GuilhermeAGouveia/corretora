import { Request, Response } from "express";
import {Controller} from "../interfaces"
import locatarioService from "../services/LocatarioService";

export default {
  count: async (req: Request, res: Response) => {
    const count = await locatarioService.count();
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para locatario");
  },
  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const locatario = await locatarioService.getByCod(cod);
    res.json(locatario);
  },
  getAll: async (req: Request, res: Response) => {
    const locatario = await locatarioService.getAll();

    res.json(locatario);
  },

  insert: async (req: Request, res: Response) => {
    res.status(404).send("Not supported");
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const locatario = await locatarioService.delete(cod);

      return res.json(locatario);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
