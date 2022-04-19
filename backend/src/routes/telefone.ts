import { Router } from "express";
import TelefoneController from "../controller/TelefoneController";

const router = Router();

const rootPath = "/telefone";

router.get(`${rootPath}/`, TelefoneController.default);
router.get(`${rootPath}/count`, TelefoneController.count);
router.get(`${rootPath}/get`, TelefoneController.getByCod);
router.get(`${rootPath}/all`, TelefoneController.getAll);

router.post(`${rootPath}/`, TelefoneController.insert);

router.delete(`${rootPath}/`, TelefoneController.delete);

export default router;
