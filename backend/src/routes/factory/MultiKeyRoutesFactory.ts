import Controller from "../../controller/IController";
import RoutesFactory from "./RoutesFactory";

class MultiKeyRoutesFactory extends RoutesFactory {
    constructor(rootPath: string, controller: Controller) {
        super(rootPath, controller);
    }
    createRoutes() {
        const router = super.createRoutes();
        router.get(`${this.rootPath}/get/`, this.controller.getByCod);
        router.delete(`${this.rootPath}/`, this.controller.delete);
        return router;
    }
}

export default MultiKeyRoutesFactory;