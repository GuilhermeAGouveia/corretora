import ContratoController from "../controller/ContratoController";
import MultiKeyRoutesFactory from "./factory/MultiKeyRoutesFactory";

const routesFactory = new MultiKeyRoutesFactory("/contrato", ContratoController);
export default routesFactory.createRoutes();