import { PrismaClient } from "@prisma/client";
import { Express, Request, Response } from "express";
import deleteFile from "../lib/deleteFile";
import Controller from "./IController";

const prisma = new PrismaClient();

interface MulterFileS3 extends Express.Multer.File {
  location: string;
  key: string;
}

export default {
  count: async (req: Request, res: Response) => {
    const count = await prisma.image.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para image");
  },
  getByCod: async (req: Request, res: Response) => {
    try {
      const key = req.params.cod;
      const image = await prisma.image.findUnique({
        where: {
          key,
        },
      });

      res.json(image);
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
  getAll: async (req: Request, res: Response) => {
    const image = await prisma.image.findMany();
    res.json(image);
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
      const { idOwner } = req.query as any;
      if (req.file) {
        const filename = key || localFilename;
        const url =
          location || `http://localhost:3333/storage/image/${filename}`;
        const imageInsert = await prisma.image.create({
          data: {
            key: filename,
            idOwner,
            url,
            originalname,
            size,
          },
        });

        return res.json(imageInsert.url);
      }

      return res.status(401).send("Sem imagem");
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const key = req.params.cod;

      const image = await prisma.image.delete({
        where: {
          key,
        },
      });

      await deleteFile(image); // delete file from s3 or local

      res.json(image);
    } catch (error: any) {
      switch (error.code) {
        case "P2025":
          return res.status(400).json({
            error: "Não é possível deletar um image que não está cadastrado",
          });
        default:
          res.status(500).json(error);
      }
    }
  },
} as Controller;
