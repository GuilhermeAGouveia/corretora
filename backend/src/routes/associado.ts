import AssociadoController from "../controller/AssociadoController";
import MultiKeyRoutesFactory from "./MultiKeyRoutesFactory";


const routesFactory = new MultiKeyRoutesFactory("/associado", AssociadoController);

export default routesFactory.createRoutes();
