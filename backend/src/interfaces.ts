export interface Controller<T> {
    default: (req: Request, res: Response) => Promise<void>;
    count: (req: Request, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response) => Promise<void>;
    insert: (req: Request, res: Response) => Promise<void>;
}