import { FormImovel } from "../components/page/imoveis/cadastrar/forms/FormImovel";
import { getAPIHTTPClient } from "../services/api";
import { FilterOrderQuery, IImovel, Page } from "./interfaces";
import { FilterQueryBuilder } from "./queryBuilder";

export async function getAllImovel(ctx?: any): Promise<IImovel[]> {
  const api = getAPIHTTPClient(ctx);
  const { data: imoveis } = await api.get<IImovel[]>(`/imovel/all`);
  return imoveis;
}

export async function getImovelByPage(
  pageNumber: number,
  ctx?: any
): Promise<Page<IImovel>> {
  const api = getAPIHTTPClient(ctx);
  const { data: pageImoveis } = await api.get<Page<IImovel>>(
    `/imovel/page/${pageNumber}`
  );
  return pageImoveis;
}

export async function getByCodImovel(cod: string, ctx?: any): Promise<IImovel> {
  const api = getAPIHTTPClient(ctx);
  const { data: imovel } = await api.get<IImovel>(`/imovel/get/${cod}`);
  return imovel;
}

export async function getByLocador(cod: string, ctx?: any): Promise<Page<IImovel>> {
  const api = getAPIHTTPClient(ctx);
  const { data: pageImovel } = await api.get<Page<IImovel>>(`/imovel/filter/1?cod_lcd=${cod}&limit=99999`);
  return pageImovel;
}

export async function getImoveisByFilterWithPage(
  filterValues: FilterOrderQuery,
  page: number,
  ctx?: any
): Promise<Page<IImovel>> {
  const api = getAPIHTTPClient(ctx);

  const {
    type,
    mensalidadeMax,
    mensalidadeMin,
    offerType,
    priceMin,
    priceMax,
    orderBy,
    sort,
  } = filterValues;

  const queryBuilder = new FilterQueryBuilder(`/imovel/filter/${page}`);

  queryBuilder.addStringQuery("type", type);
  queryBuilder.addStringQuery("offerType", offerType);
  queryBuilder.addRangeNumberQuery("mensalidade", {
    min: mensalidadeMin,
    max: mensalidadeMax,
  });
  queryBuilder.addRangeNumberQuery("price", { min: priceMin, max: priceMax });
  queryBuilder.addStringQuery("orderBy", orderBy);
  queryBuilder.addStringQuery("sort", sort);

  const { data: pageImoveis } = await api.get<Page<IImovel>>(
    queryBuilder.getQuery()
  );

  return pageImoveis;
}

export async function insertImovel(
  imovel: IImovel,
  ctx?: any
): Promise<string> {
  const api = getAPIHTTPClient(ctx);
  const response = await api.post<string>("/imovel", imovel);
  return response.data;
}

export function parseFormImovelToIImovel(
  formImovel: FormImovel & {
    idOwner: string;
  }
): IImovel {
  const {
    street,
    number,
    district,
    state,
    city,
    area,
    mensalidade,
    price,
    type,
    idOwner: id
  } = formImovel;

  const imovel: IImovel = {
    address: `${street}, ${number}`,
    district: district as string,
    state: state as string,
    city: city as string,
    area: area ? parseFloat(area) : 0,
    cod_lcd: id,
    cep: "",
    mensalidade: mensalidade ? parseFloat(mensalidade) : 0,
    price: price ? parseFloat(price) : 0,
    type,
  } as IImovel;

  return imovel;
}
