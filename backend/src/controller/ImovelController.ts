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
    try {
      const {
        city,
        state,
        mensalidade,
        price,
        supDescribe,
        type,
        area,
        offerType,
        orderBy,
        sort,
      } = req.query as {
        city?: string;
        state?: string;
        mensalidade?: string;
        price?: string;
        supDescribe?: string;
        type?: ImovelType;
        area?: string;
        offerType?: OfferType; // Indica se é aluguel ou venda
        orderBy?: string;
        sort?: string;
      };

      const page = parseInt((req.params.page as string) || "1");
      const limit = parseInt((req.query.limit as string) || "10");

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

      // define ordenação

      const wherePrisma = {
        ...filter.area,
        ...filter.state,
        ...filter.mensalidade,
        ...filter.price,
        ...filter.supDescribe,
        ...filter.offerType(offerType),
        ...filter.area,
        ...filter.type,
      };

      // Se o campo em orderBy não existir, um error será lançado
      function defineOrderBy(orderBy?: string, sort?: string) {
        if (!orderBy) {
          return {};
        }

        if (Object.keys({} as Imovel).includes(orderBy)) {
          throw new Error(`Field ${orderBy} not found`);
        }

        if (!["asc", "desc"].includes((sort as string).toLowerCase())) {
          throw new Error(`Sort ${sort} not found`);
        }

        return {
          [orderBy]: sort?.toLowerCase() || "asc",
        };
      }

      const imoveis = prisma.imovel.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: wherePrisma,
        orderBy: defineOrderBy(orderBy, sort),
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

      const count = prisma.imovel.count({
        where: wherePrisma,
      });

      const [imoveisList, total] = await prisma.$transaction([imoveis, count]);

      res.json({
        data: imoveisList,
        total,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  page: async (req: Request, res: Response) => {
    const page = parseInt(req.params.page as string); // page é um string que vem do params
    const perPage = parseInt((req.query.perPage as string) || "10"); // perPage é um string que vem do query, se não tiver, usa 10 como default

    const imoveis = prisma.imovel.findMany({
      skip: perPage * (page - 1),
      take: perPage,
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

    const total = prisma.imovel.count();

    const [imoveisPage, totalPage] = await prisma.$transaction([
      imoveis,
      total,
    ]);

    res.json({
      data: imoveisPage,
      total: totalPage,
    });
  },
} as Controller & {
  filter: (req: Request, res: Response) => Promise<void>;
  page: (req: Request, res: Response) => Promise<void>;
};
