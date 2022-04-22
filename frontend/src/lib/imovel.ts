import { getAPIHTTPClient } from '../services/api';
import { IImovel } from "./interfaces";



export async function getAllImovel(ctx?: any): Promise<IImovel[]> {
    const api = getAPIHTTPClient(ctx);
    const {data: imoveis} = await api.get<IImovel[]>(`/imovel/all`);
    return imoveis;
}

export async function getByCodImovel(cod: string, ctx?: any): Promise<IImovel> {
    const api = getAPIHTTPClient(ctx);
    const {data: imovel} = await api.get<IImovel>(`/imovel/get/${cod}`);
    return imovel;
}