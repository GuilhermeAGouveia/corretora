import { IButton } from "../lib/interfaces";
import api from '../services/api';


export async function getButtonContent(): Promise<IButton[]> {
    const {data: buttons} = await api.get<IButton[]>(`/buttons`);
    return await buttons;
}