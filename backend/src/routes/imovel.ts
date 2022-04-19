import ImovelController from "../controller/ImovelController";
import UniqueKeyRoutesFactory from "./UniqueKeyRoutesFactory";

/* const router = Router();

const rootPath = "/imovel";

router.get(`${rootPath}/`, ImovelController.default);
router.get(`${rootPath}/count`, ImovelController.count);
router.get(`${rootPath}/get/:cod`, ImovelController.getByCod);
router.get(`${rootPath}/all`, ImovelController.getAll);

router.post(`${rootPath}/`, ImovelController.insert);

router.delete(`${rootPath}/:cod`, ImovelController.delete); */

const routesFactory = new UniqueKeyRoutesFactory("/imovel", ImovelController);

export default routesFactory.createRoutes();
