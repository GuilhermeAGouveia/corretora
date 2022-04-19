import AssociadoController from "../controller/AssociadoController";
import MultiKeyRoutesFactory from "./MultiKeyRoutesFactory";

/* const router = Router();

const rootPath = "/associado";

router.get(`${rootPath}/`, AssociadoController.default);
router.get(`${rootPath}/count`, AssociadoController.count);
router.get(`${rootPath}/get`, AssociadoController.getByCod);
router.get(`${rootPath}/all`, AssociadoController.getAll);

router.post(`${rootPath}/`, convertStringToDateMiddleware ,AssociadoController.insert);

router.delete(`${rootPath}/`, AssociadoController.delete); */

const routesFactory = new MultiKeyRoutesFactory("/associado", AssociadoController);

export default routesFactory.createRoutes();
