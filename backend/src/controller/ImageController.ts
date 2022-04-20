import { Image, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "./IController";

const prisma = new PrismaClient();

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
      const idImage = req.query as any as Image;
      const image = await prisma.image.findUnique({
        where: {
          idImage,
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
      const image = req.file;
      process.env.PUBLIC_URL;
      const { idOwner } = req.query as any;
      if (image) {
        const imageInsert = await prisma.image.create({
          data: {
            idOwner,
            url: `${process.env.PUBLIC_URL}/storage/image/${image.filename}`,
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
      const idImage = req.query as any as Image;

      const image = await prisma.image.delete({
        where: {
          idImage,
        },
      });

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
