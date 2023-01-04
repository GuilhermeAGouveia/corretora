import { Image } from "@prisma/client";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new aws.S3({
    region: process.env.AWS_DEFAULT_REGION as string,
});

async function deleteImage(image: Image) {
  try {
    if (image.url.includes("localhost")) {
      const filePath = path.resolve(
        __dirname,
        "../../storage/image",
        image.key
      );
      if (fs.existsSync(filePath))
        fs.unlinkSync(filePath);
    } else {
        const response = await s3.deleteObject({
          Bucket: process.env.BUCKET_NAME as string,
          Key: image.key,
        }).promise()
      }
    
  } catch (error) {
    return new Error("Não foi possível deletar a imagem");
  }
}

export default deleteImage;
