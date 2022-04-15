import { Router } from "express";
import CorretorController from "../controller/CorretorController";
import LocadorController from "../controller/LocadorController";
import LocatarioController from "../controller/LocatarioController";
import { convertStringToDateMiddleware } from "../middleware";

const router = Router();

const rootPath = "/pessoa";

//locador
router.get(`${rootPath}/locador/`, LocadorController.default);
router.get(`${rootPath}/locador/all`, LocadorController.getAll);
router.get(`${rootPath}/locador/count`, LocadorController.count);

//necessários que a rota esteja abaixo de todas as outras rotas GET de corretor
router.get(`${rootPath}/locador/:cod`, LocadorController.getByCod);

router.post(`${rootPath}/locador/`, LocadorController.insert);

//corretor
router.get(`${rootPath}/corretor/`, CorretorController.default);
router.get(`${rootPath}/corretor/all`, CorretorController.getAll);
router.get(`${rootPath}/corretor/count`, CorretorController.count);

//necessários que a rota esteja abaixo de todas as outras rotas GET de corretor
router.get(`${rootPath}/corretor/:cod`, CorretorController.getByCod);

router.post(`${rootPath}/corretor`, CorretorController.insert);

//locatario
router.get(`${rootPath}/locatario/`, LocatarioController.default);
router.get(`${rootPath}/locatario/all`, LocatarioController.getAll);
router.get(`${rootPath}/locatario/count`, LocatarioController.count);

//necessários que a rota esteja abaixo de todas as outras rotas GET de Locatario
router.get(`${rootPath}/locatario/:cod`, LocatarioController.getByCod);

router.post(
  `${rootPath}/locatario`,
  convertStringToDateMiddleware,
  LocatarioController.insert
);

export default router;
