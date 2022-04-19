import ImovelController from "../controller/ImovelController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";

const routesFactory = new UniqueKeyRoutesFactory("/imovel", ImovelController);

export default routesFactory.createRoutes();
