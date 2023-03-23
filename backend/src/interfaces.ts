import {Express, Request, Response} from "express";
import {ImovelType} from "@prisma/client"

export interface Controller {
    default: (req: Request, res: Response) => void;
    count: (req: Request, res: Response) => void;
    getAll: (req: Request, res: Response) => void;
    getByCod: (req: Request, res: Response) => void;
    insert: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}

export interface Service<T, I> {
    count: () => Promise<number>;
    getAll: () => Promise<T[]>;
    getByCod: (cod: I) => Promise<T>;
    insert: (element: T) => Promise<T>;
    delete: (cod: I) => Promise<T>;
}

export interface MulterFileS3 extends Express.Multer.File {
    location: string;
    key: string;
}

export enum OfferType {
    Venda = "VENDA",
    Aluguel = "ALUGUEL",
  }
  
export interface Filter {
    local?: string;
    mensalidade?: string;
    price?: string;
    supDescribe?: string;
    type?: ImovelType;
    area?: string;
    offerType?: OfferType; // Indica se é aluguel ou venda
    orderBy?: string;
    sort?: string;
    cod_lcd?: string;
  }

  export interface Page<T> {
    data: T[];
    hasNext: boolean;
    total: number;
  }

  export interface Pagination {
    page: number;
    limit: number;
  }