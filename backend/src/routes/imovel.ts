import ImovelController from "../controller/ImovelController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";

const routesFactory = new UniqueKeyRoutesFactory("/imovel", ImovelController);
const router = routesFactory.createRoutes();

router.get("/imovel/filter/:page", ImovelController.filter);
router.get("/imovel/page/:page", ImovelController.page);


export default router;
