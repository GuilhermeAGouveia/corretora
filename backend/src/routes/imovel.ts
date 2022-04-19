import ImovelController from "../controller/ImovelController";
import UniqueKeyRoutesFactory from "./UniqueKeyRoutesFactory";

const routesFactory = new UniqueKeyRoutesFactory("/imovel", ImovelController);

export default routesFactory.createRoutes();
