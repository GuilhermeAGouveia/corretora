import aws from "aws-sdk";
import crypto from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '../../storage/image'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, "");

                const filename = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, filename);
            });
        },
    }),
    s3: multerS3({
        s3: new aws.S3({
            region: process.env.DEFAULT_REGION_AWS as string,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID_AWS as string,
                secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS as string,
            }
        }),
        bucket: process.env.BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};

export default multer(
    {
        storage: storageTypes[process.env.STORAGE_TYPE as "local" | "s3"],
        fileFilter: (req, file, cb) => {
            const isAccepted = [
                'image/png',
                'image/jpg',
                'image/jpeg'
            ]

            if (!isAccepted.includes(file.mimetype))
                cb(new Error('Arquivo não suportado'));

            cb(null, true);
        },
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB
        }
    }
)