import { Imovel, PrismaClient } from "@prisma/client";
import { Console } from "console";
import { Service, Filter, Page, OfferType } from "../interfaces";

const prisma = new PrismaClient();

function adapterFilterFrontendToBackend(filterProps: Filter) {
  const {
    local,
    mensalidade,
    price,
    area,
    supDescribe,
    type,
    offerType,
    cod_lcd,
  } = filterProps;

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

  function getWhereOfferType(offerType?: string) {
    switch (offerType) {
      case OfferType.Venda:
        return { price: { not: { equals: 0 } } };
      case OfferType.Aluguel:
        return { mensalidade: { not: { equals: 0 } } };
      default:
        return {};
    }
  }

  // mensalidade, price e area chega no formato min-max
  const mensalidadeRange = getRangeObject(mensalidade);
  const priceRange = getRangeObject(price);
  const areaRange = getRangeObject(area);

  // cria um objeto com os filtros
  const filter = {
    OR:
      local && local !== "[]"
        ? JSON.parse(local).map(
            ({ city, state }: { city: string; state: string }) => ({
              city: { contains: city },
              state: { contains: state },
            })
          )
        : undefined,

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
    area: areaRange ? { area: { gte: areaRange.min, lte: areaRange.max } } : {},
    supDescribe: supDescribe ? { supDescribe: { contains: supDescribe } } : {},
    cod_lcd: cod_lcd ? { cod_lcd: { equals: cod_lcd } } : {},
    type: type ? { type: { equals: type } } : {},
    offerType: getWhereOfferType(offerType),
  };
  return filter;
}


export default {
  count: async () => {
    const count = await prisma.imovel.count();
    return count;
  },

  getByCod: async (cod: string) => {
    try {
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
      return imovel;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getAll: async () => {
    const imovel = await prisma.imovel.findMany({
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
    return imovel;
  },

  insert: async (element: Imovel) => {
    try {
      const imovelInsert = await prisma.imovel.create({
        data: element,
      });
      return imovelInsert;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  delete: async (cod: string) => {
    try {
      const imovel = await prisma.imovel.delete({
        where: {
          cod_imv: cod,
        },
      });
      return imovel;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  filter: async (filterProps, pageDefinitions) => {

    if (pageDefinitions.pageNumber < 1) 
      throw new Error("O numero de página deve ser maior que 1")

    const filter = adapterFilterFrontendToBackend(filterProps);

      const wherePrisma = {
      OR: filter.OR,
      ...filter.area,
      ...filter.mensalidade,
      ...filter.price,
      ...filter.supDescribe,
      ...filter.offerType,
      ...filter.area,
      ...filter.type,
      ...filter.cod_lcd,
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
      skip: (pageDefinitions.pageNumber - 1) * pageDefinitions.limit,
      take: pageDefinitions.limit,
      where: wherePrisma,
      orderBy: defineOrderBy(filterProps.orderBy, filterProps.sort),
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

    return {
      data: imoveisList,
      total,
      hasNext: total > pageDefinitions.pageNumber * pageDefinitions.limit,
    };
  }
} as Service<Imovel, string> & {
  filter: (
    filterProps: Filter,
    pageDefinitions: { 
      pageNumber: number; 
      limit: number 
    },
    sortDefinitions: {
      orderBy?: string;
      sort?: string;
    }
  ) => Promise<Page<Imovel>>;
};
