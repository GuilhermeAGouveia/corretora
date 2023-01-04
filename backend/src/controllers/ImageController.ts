import {Express, Request, Response} from "express";
import deleteFile from "../libs/deleteFile";
import imageService from "../services/ImageService";
import {Controller} from "../interfaces"

interface MulterFileS3 extends Express.Multer.File {
    location: string;
    key: string;
}

export default {
    count: async (req: Request, res: Response) => {
        const count = await imageService.count();
        res.json(count);
    },
    default: async (req: Request, res: Response) => {
        res.send("Raiz para image");
    },
    getAll: async (req: Request, res: Response) => {
        const images = await imageService.getAll();
        res.json(images);
    },
    insert: async (req: Request, res: Response) => {
        try {
            const {
                location,
                key,
                filename: localFilename,
                originalname,
                size,
            } = req.file as MulterFileS3;
            const {idOwner} = req.query as any;
            if (req.file) {
                const filename = key || localFilename;
                const url =
                    location || `http://localhost:3333/storage/image/${filename}`;
                const image = {
                    key: filename,
                    idOwner,
                    url,
                    originalname,
                    size,
                    createdAt: null
                };
                const imageInsert = await imageService.insert(image);
                return res.json(imageInsert.url);
            }

            return res.status(401).send("Sem imagem");
        } catch (error: any) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const key = req.params.cod;

            const image = await imageService.delete(key);

            await deleteFile(image); // delete file from s3 or local

            res.json(image);
        } catch (error: any) {
            const message = error.message || "Erro ao deletar imagem";
            res.status(400).json({message});
        }
    },
    getByCod: async (req: Request, res: Response) => {
        const {codImv} = req.params;
        const images = await imageService.getByImv(codImv);
        return res.json(images);
    },
} as Controller;
