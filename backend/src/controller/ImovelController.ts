import { Imovel, ImovelType, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

enum OfferType {
  Venda = "VENDA",
  Aluguel = "ALUGUEL",
}

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
    const {
      city,
      state,
      mensalidade,
      price,
      supDescribe,
      type,
      area,
      offerType,
    } = req.query as {
      city?: string;
      state?: string;
      mensalidade?: string;
      price?: string;
      supDescribe?: string;
      type?: ImovelType;
      area?: string;
      offerType?: OfferType; // Indica se é aluguel ou venda
    };

    function getRangeObject(range?: string) {
      if (!range) {
        return {};
      }
      const [min, max] = range.split("-");

      return {
        min: parseInt(min),
        max: max === "Infinity" ? undefined : parseInt(max),
      };
    }

    // mensalidade, price e area chega no formato min-max
    const mensalidadeRange = getRangeObject(mensalidade);
    const priceRange = getRangeObject(price);
    const areaRange = getRangeObject(area);

    // cria um objeto com os filtros
    const filter = {
      city: city ? { city: { contains: city } } : {},

      state: state ? { state: { contains: state } } : {},

      mensalidade: mensalidadeRange
        ? {
            mensalidade: {
              gte: mensalidadeRange.min,
              lte: mensalidadeRange.max,
            },
          }
        : {},
      price: priceRange
        ? { price: { gte: priceRange.min, lte: priceRange.max } }
        : {},
      area: areaRange
        ? { area: { gte: areaRange.min, lte: areaRange.max } }
        : {},
      supDescribe: supDescribe
        ? { supDescribe: { contains: supDescribe } }
        : {},
      type: type ? { type: { equals: type } } : {},
      offerType: (offerType?: string) => {
        switch (offerType) {
          case OfferType.Venda:
            return { price: { not: { equals: 0 } } };
          case OfferType.Aluguel:
            return { mensalidade: { not: { equals: 0 } } };
          default:
            return {};
        }
      },
    };

    const imoveis = await prisma.imovel.findMany({
      where: {
        ...filter.area,
        ...filter.state,
        ...filter.mensalidade,
        ...filter.price,
        ...filter.supDescribe,
        ...filter.offerType(offerType),
        ...filter.area,
        ...filter.type,
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
