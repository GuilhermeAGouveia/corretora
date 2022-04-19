import { Router } from "express";
import CorretorController from "../controller/CorretorController";
import LocadorController from "../controller/LocadorController";
import LocatarioController from "../controller/LocatarioController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";


const routerLocador = new UniqueKeyRoutesFactory("/pessoa/locador", LocadorController);
const routesLocador = routerLocador.createRoutes();

const routerCorretor = new UniqueKeyRoutesFactory("/pessoa/corretor", CorretorController);
const routesCorretor = routerCorretor.createRoutes();

const routerLocatario = new UniqueKeyRoutesFactory("/pessoa/locatario", LocatarioController);
const routesLocatario = routerLocatario.createRoutes();

export default Router().use([routesCorretor, routesLocador, routesLocatario]);
