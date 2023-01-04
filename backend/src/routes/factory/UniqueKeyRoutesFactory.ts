import {Controller} from "../../interfaces"
import RoutesFactory from "./RoutesFactory";

class UniqueKeyRoutesFactory extends RoutesFactory {
    constructor(rootPath: string, controller: Controller) {
        super(rootPath, controller);
    }
    createRoutes() {
        const router = super.createRoutes();
        router.get(`${this.rootPath}/get/:cod`, this.controller.getByCod);
        router.delete(`${this.rootPath}/:cod`, this.controller.delete);
        return router;
    }
}

export default UniqueKeyRoutesFactory;