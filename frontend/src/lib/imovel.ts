import api from '../services/api';
import { IImovel } from "./interfaces";

export async function getAllImovel(): Promise<IImovel[]> {
    const {data: imoveis} = await api.get<IImovel[]>(`/imovel/all`);
    return imoveis;
}

export async function getByCodImovel(cod: string): Promise<IImovel> {
    const {data: imoveis} = await api.get<IImovel>(`/imovel/get/${cod}`);
    return imoveis;
}