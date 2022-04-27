import ImovelController from "../controller/ImovelController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";

const routesFactory = new UniqueKeyRoutesFactory("/imovel", ImovelController);
const router = routesFactory.createRoutes();

router.get("/imovel/filter", ImovelController.filter);


export default router;
