import AssociadoController from "../controller/AssociadoController";
import MultiKeyRoutesFactory from "./factory/MultiKeyRoutesFactory";


const routesFactory = new MultiKeyRoutesFactory("/associado", AssociadoController);

export default routesFactory.createRoutes();
