import crypto from "crypto";
import multer from "multer";
import path from "path";

export default multer(
    {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '../../storage/image'));
            },
            filename: (req, file, cb) => {
                //const date = new Date().toISOString().replace(/:/g, '-');
                //const random = Math.random().toString().split('.')[1];

                crypto.randomBytes(16, (err, hash) => {
                    if (err) cb(err, "");                  
                    cb(null, `${hash.toString('hex')}-${file.originalname}`);
                });
                
            }
        }),
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