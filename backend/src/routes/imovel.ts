import { Router } from "express";
import ImovelController from "../controller/ImovelController";

const router = Router();

const rootPath = "/imovel";

router.get(`${rootPath}/`, ImovelController.default);
router.get(`${rootPath}/count`, ImovelController.count);
router.get(`${rootPath}/:cod`, ImovelController.getByCod);
router.get(`${rootPath}/all`, ImovelController.getAll);
router.post(`${rootPath}/`, ImovelController.insert);

export default router;
