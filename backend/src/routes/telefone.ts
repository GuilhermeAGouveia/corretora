import TelefoneController from "../controllers/TelefoneController";
import MultiKeyRoutesFactory from "./factory/MultiKeyRoutesFactory";

const routesFactory = new MultiKeyRoutesFactory("/telefone", TelefoneController);

export default routesFactory.createRoutes();
