import { Router } from "express";
import {Controller} from "../../interfaces"

class RoutesFactory {
    protected rootPath: string;
    protected controller: Controller;

    constructor(rootPath: string, controller: Controller) {
        this.rootPath = rootPath;
        this.controller = controller;
    }

    private getRouter() {
        return Router();
    }

    createRoutes() {
        const router = this.getRouter();
        router.get(`${this.rootPath}/`, this.controller.default);
        router.get(`${this.rootPath}/count`, this.controller.count);
        router.get(`${this.rootPath}/all`, this.controller.getAll);
        router.post(`${this.rootPath}/`, this.controller.insert);
        return router;

    }
}

export default RoutesFactory;