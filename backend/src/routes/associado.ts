import { Router } from "express";
import AssociadoController from "../controller/AssociadoController";

const router = Router();

const rootPath = "/associado";

router.get(`${rootPath}/`, AssociadoController.default);
router.get(`${rootPath}/count`, AssociadoController.count);
router.get(`${rootPath}/get`, AssociadoController.getByCod);
router.get(`${rootPath}/all`, AssociadoController.getAll);

router.post(`${rootPath}/`, AssociadoController.insert);

router.delete(`${rootPath}/`, AssociadoController.delete);

export default router;
