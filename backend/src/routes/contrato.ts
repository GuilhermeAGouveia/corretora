import ContratoController from "../controllers/ContratoController";
import MultiKeyRoutesFactory from "./factory/MultiKeyRoutesFactory";

const routesFactory = new MultiKeyRoutesFactory("/contrato", ContratoController);
export default routesFactory.createRoutes();