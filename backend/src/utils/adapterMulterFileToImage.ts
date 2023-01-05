import {MulterFileS3} from "../interfaces";
import {Image} from "@prisma/client";

export function adapterMulterFileToImage({
                                             key,
                                             filename,
                                             originalname,
                                             size,
                                             location
                                         }: MulterFileS3, idOwner: string): Image {
    filename = key || filename;
    const url = location || `http://localhost:3333/storage/image/${filename}`;
    return {
        key: filename, idOwner, url, originalname, size, createdAt: null
    };
}