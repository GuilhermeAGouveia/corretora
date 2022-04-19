import TelefoneController from "../controller/TelefoneController";
import MultiKeyRoutesFactory from "./MultiKeyRoutesFactory";

const routesFactory = new MultiKeyRoutesFactory("/telefone", TelefoneController);

export default routesFactory.createRoutes();
