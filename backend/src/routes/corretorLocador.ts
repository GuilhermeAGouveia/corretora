import CorretorLocadorController from "../controller/CorretorLocadorController";
import MultiKeyRoutesFactory from "./factory/MultiKeyRoutesFactory";

const routesFactory = new MultiKeyRoutesFactory("/corretorlocador", CorretorLocadorController);

export default routesFactory.createRoutes();