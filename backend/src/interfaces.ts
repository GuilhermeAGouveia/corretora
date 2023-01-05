import {Express, Request, Response} from "express";

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