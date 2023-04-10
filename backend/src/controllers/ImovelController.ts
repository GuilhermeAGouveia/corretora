import { Imovel, ImovelType, PrismaClient } from "@prisma/client";
import imovelService from "../services/ImovelService";
import { Request, Response } from "express";
import { Controller, Filter } from "../interfaces";

const prisma = new PrismaClient();

export default {
  count: async (req: Request, res: Response) => {
    const count = await imovelService.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para imóveis");
  },

  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const imovel = await imovelService.getByCod(cod);

    return res.json(imovel);
  },

  getAll: async (req: Request, res: Response) => {
    const imoveis = await imovelService.getAll();
    res.json(imoveis);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const imovel = req.body as Imovel;
      const imovelInsert = await imovelService.insert(imovel);
      res.status(201).json(imovelInsert.cod_imv);
    } catch (error: any) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod: string = req.params.cod;
      const imovel = await imovelService.delete(cod);
      res.json(imovel);
    } catch (error: any) {
      res.status(400).json(error);
    }
  },

  filter: async (req: Request, res: Response) => {
    try {
      let filterProps = req.query as Filter;

      //Get page attributes
      const page = parseInt((req.params.page as string) || "1");
      const limit = parseInt((req.query.limit as string) || "10");

      //Get sort attributes
      const orderBy = req.query.orderBy as string | undefined;
      const sort = req.query.sort as string | undefined;

      const result = await imovelService.filter(
        filterProps,
        {
          page,
          limit,
        },
        {
          orderBy,
          sort,
        }
      );
      return res.json(result)
    } catch (error) {
      console.log(error)
      res.status(400).send("Erro ao buscar informações de filtro, consulte os logs da API");
    }
  },

  page: async (req: Request, res: Response) => {
    const page = parseInt(req.params.page as string); // page é um string que vem do params
    const perPage = parseInt((req.query.perPage as string) || "10"); // perPage é um string que vem do query, se não tiver, usa 10 como default

    const pageImoveis = await imovelService.page({page, limit: perPage});
    res.json(pageImoveis);
  },
} as Controller & {
  filter: (req: Request, res: Response) => Promise<void>;
  page: (req: Request, res: Response) => Promise<void>;
};
