import { Request, Response } from 'express';

export default interface Controller {
    default: (req: Request, res: Response) => void;
    count: (req: Request, res: Response) => void;
    getAll: (req: Request, res: Response) => void;
    insert: (req: Request, res: Response) => void;
}