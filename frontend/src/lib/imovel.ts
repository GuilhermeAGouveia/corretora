import { getAPIHTTPClient } from '../services/api';
import { FilterValues, IImovel, Page } from "./interfaces";
import { FilterQueryBuilder } from './queryBuilder';



export async function getAllImovel(ctx?: any): Promise<IImovel[]> {
    const api = getAPIHTTPClient(ctx);
    const {data: imoveis} = await api.get<IImovel[]>(`/imovel/all`);
    return imoveis;
}

export async function getImovelByPage(pageNumber: number, ctx?: any): Promise<Page<IImovel>> {
    const api = getAPIHTTPClient(ctx);
    const {data: pageImoveis} = await api.get<Page<IImovel>>(`/imovel/page/${pageNumber}`);
    return pageImoveis;
}

export async function getByCodImovel(cod: string, ctx?: any): Promise<IImovel> {
    const api = getAPIHTTPClient(ctx);
    const {data: imovel} = await api.get<IImovel>(`/imovel/get/${cod}`);
    return imovel;
}

export async function getImoveisByFilterWithPage(filterValues: FilterValues, page: number, ctx?: any): Promise<Page<IImovel>> {
    const api = getAPIHTTPClient(ctx);

    const {
        type,
        mensalidadeMax,
        mensalidadeMin,
        offerType,
        priceMin,
        priceMax,
      } = filterValues;
  
  
  
      const queryBuilder = new FilterQueryBuilder(`/imovel/filter/${page}`);
  
      queryBuilder.type(type);
      queryBuilder.offerType(offerType);
      queryBuilder.mensalidade({ min: mensalidadeMin, max: mensalidadeMax });
      queryBuilder.price({ min: priceMin, max: priceMax });
  
      const { data: pageImoveis } = await api.get<Page<IImovel>>(queryBuilder.getQuery());

      return pageImoveis
    }