import { Router } from "express";
import CorretorController from "../controller/CorretorController";
import LocadorController from "../controller/LocadorController";
import LocatarioController from "../controller/LocatarioController";
import UniqueKeyRoutesFactory from "./UniqueKeyRoutesFactory";



const rootPath = "/pessoa";

//locador
/* router.get(`${rootPath}/locador/`, LocadorController.default);
router.get(`${rootPath}/locador/all`, LocadorController.getAll);
router.get(`${rootPath}/locador/count`, LocadorController.count);
router.get(`${rootPath}/locador/get/:cod`, LocadorController.getByCod);

router.post(`${rootPath}/locador/`, LocadorController.insert);

router.delete(`${rootPath}/locador/:cod`, LocadorController.delete);
 */

const routerLocador = new UniqueKeyRoutesFactory("/pessoa/locador", LocadorController);
const routesLocador = routerLocador.createRoutes();

//corretor
/* router.get(`${rootPath}/corretor/`, CorretorController.default);
router.get(`${rootPath}/corretor/all`, CorretorController.getAll);
router.get(`${rootPath}/corretor/count`, CorretorController.count);
router.get(`${rootPath}/corretor/get/:cod`, CorretorController.getByCod);

router.post(`${rootPath}/corretor`, CorretorController.insert);

router.delete(`${rootPath}/corretor/:cod`, CorretorController.delete); */

const routerCorretor = new UniqueKeyRoutesFactory("/pessoa/corretor", CorretorController);
const routesCorretor = routerCorretor.createRoutes();

//locatario
/* router.get(`${rootPath}/locatario/`, LocatarioController.default);
router.get(`${rootPath}/locatario/all`, LocatarioController.getAll);
router.get(`${rootPath}/locatario/count`, LocatarioController.count);
router.get(`${rootPath}/locatario/get/:cod`, LocatarioController.getByCod);

router.post(
  `${rootPath}/locatario`,
  convertStringToDateMiddleware,
  LocatarioController.insert
);

router.delete(`${rootPath}/locatario/:cod`, LocatarioController.delete); */

const routerLocatario = new UniqueKeyRoutesFactory("/pessoa/locatario", LocatarioController);
const routesLocatario = routerLocatario.createRoutes();

export default Router().use([routesCorretor, routesLocador, routesLocatario]);
