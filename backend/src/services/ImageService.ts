import {PrismaClient, Image} from "@prisma/client";
import deleteFile from "../libs/deleteFile";
import {Service} from "../interfaces"

const prisma = new PrismaClient();

export default {
    count: async () => {
        const count = await prisma.image.count();
        return count;
    },
    getAll: async () => {
        const images = await prisma.image.findMany();
        return images;
    },
    insert: async (image) => {
        try {
            const imageInsert = await prisma.image.create({
                data: image,
            });
            return imageInsert

        } catch (error: any) {
            throw new Error(error);
        }
    },
    delete: async (cod) => {
        try {
            const image = await prisma.image.delete({
                where: {
                    key: cod,
                },
            });
            await deleteFile(image); // delete file from s3 or local
            return image;
        } catch (error: any) {
            throw new Error(error);
        }
    },
    getByCod: async (cod) => {
        const image = await prisma.image.findUnique({
            where: {
                key: cod,
            },
        });

        return image;
    },

    getByImv: async (codImv) => {
        const image = await prisma.image.findMany({
            where: {
                idOwner: codImv,
            },
        });

        return image;
    }

} as Service<Image, string> & {
    getByImv: (codImv: string) => Promise<Image[] | null>;
};
