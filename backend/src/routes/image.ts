import express, { Router } from "express";
import path from "path";
import ImageController from "../controller/ImageController";
import multerLib from "../lib/multerImage";

const router = Router();


router.use('/storage/image', express.static(path.resolve(__dirname, '../../storage/image')));

router.post("/image/upload", multerLib.single('file'), ImageController.insert);
router.get("/image/all", ImageController.getAll);
router.delete("/image/:cod", ImageController.delete);

export default router;