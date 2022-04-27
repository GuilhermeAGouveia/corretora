import { Imovel, ImovelType, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();
export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.imovel.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para imóveis");
  },

  getByCod: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const imovel = await prisma.imovel.findUnique({
      where: {
        cod_imv: cod,
      },
      include: {
        locador: true,
        images: {
          select: {
            url: true,
            originalname: true,
            size: true,
          },
        },
      },
    });

    return res.json(imovel);
  },

  getAll: async (req: Request, res: Response) => {
    const imoveis = await prisma.imovel.findMany({
      include: {
        images: {
          select: {
            url: true,
            originalname: true,
            size: true,
          },
        },
      },
    });
    res.json(imoveis);
  },

  insert: async (req: Request, res: Response) => {
    try {
      const imovel = req.body as Imovel;
      const imovelInsert = await prisma.imovel.create({
        data: {
          ...imovel,
        },
      });
      res.json(imovelInsert.cod_imv);
    } catch (error: any) {
      res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    const cod: string = req.params.cod;
    const imovel = await prisma.imovel.delete({
      where: {
        cod_imv: cod,
      },
    });
    res.json(imovel);
  },

  filter: async (req: Request, res: Response) => {
    const { city, state, mensalidade, price, supDescribe, type, area } =
      req.query as {
        city?: string;
        state?: string;
        mensalidade?: string;
        price?: string;
        supDescribe?: string;
        type?: ImovelType;
        area?: string;
      };

    function getRangeObject(range?: string) {
      if (!range) {
        return {};
      }
      const [min, max] = range.split("-");
      
      return {
        min: parseInt(min),
        max: max === 'Infinity' ? undefined : parseInt(max),
      };
    }

    //mensalidade chega no formato min-max
    const mensalidadeRange = getRangeObject(mensalidade);
    console.log(mensalidadeRange)
    const priceRange = getRangeObject(price);
    const areaRange = getRangeObject(area);

    const cityFilter = city ? { city: { contains: city } } : {};
    const stateFilter = state ? { state: { contains: state } } : {};
    const mensalidadeFilter = mensalidadeRange
      ? {
          mensalidade: { gte: mensalidadeRange.min, lte: mensalidadeRange.max },
        }
      : {};
    const priceFilter = priceRange
      ? { price: { gte: priceRange.min, lte: priceRange.max } }
      : {};
    const areaFilter = areaRange
      ? { area: { gte: areaRange.min, lte: areaRange.max } }
      : {};
    const supDescribeFilter = supDescribe
      ? { supDescribe: { contains: supDescribe } }
      : {};
    const typeFilter = type ? { type: { equals: type } } : {};

     const imoveis = await prisma.imovel.findMany({
      where: {
        ...cityFilter,
        ...stateFilter,
        ...mensalidadeFilter,
        ...priceFilter,
        ...supDescribeFilter,
        ...typeFilter,
        ...areaFilter,
      },
      include: {
        images: {
          select: {
            url: true,
            originalname: true,
            size: true,
          },
        },
      },
    });
    res.json(imoveis);
  },
} as Controller & {
  filter: (req: Request, res: Response) => Promise<void>;
};
