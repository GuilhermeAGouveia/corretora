import {Request, Response} from "express";
import imageService from "../services/ImageService";
import {Controller, MulterFileS3} from "../interfaces"
import {adapterMulterFileToImage} from "../utils/adapterMulterFileToImage";

export default {
    count: async (req: Request, res: Response) => {
        const count = await imageService.count();
        res.json(count);
    }, default: async (req: Request, res: Response) => {
        res.send("Raiz para image");
    }, getAll: async (req: Request, res: Response) => {
        const images = await imageService.getAll();
        res.json(images);
    }, insert: async (req: Request, res: Response) => {
        try {
            const multerFile = req.file as MulterFileS3;
            const {idOwner} = req.query as { idOwner: string };

            if (!req.file) return res.status(401).send("Sem imagem");

            const image = adapterMulterFileToImage(multerFile, idOwner);
            const imageInsert = await imageService.insert(image);
            return res.status(201).json(imageInsert.url);

        } catch (error: any) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }, delete: async (req: Request, res: Response) => {
        try {
            const key = req.params.cod;
            const image = await imageService.delete(key);
            return res.json(image);
        } catch (error: any) {
            const message = error.message || "Erro ao deletar imagem";
            return res.status(400).json({error: message});
        }
    }, getByCod: async (req: Request, res: Response) => {
        const {codImv} = req.params;
        const images = await imageService.getByImv(codImv);
        return res.json(images);
    },
} as Controller;
