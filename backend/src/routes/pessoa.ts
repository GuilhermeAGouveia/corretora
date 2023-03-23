import { Router } from "express";
import LocadorController from "../controllers/LocadorController";
import LocatarioController from "../controllers/LocatarioController";
import PessoaController from "../controllers/PessoaController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";


const routerPessoa = new UniqueKeyRoutesFactory("/pessoa", PessoaController);
const routesPessoa = routerPessoa.createRoutes();

const routerLocador = new UniqueKeyRoutesFactory("/locador", LocadorController);
const routesLocador = routerLocador.createRoutes();

const routerLocatario = new UniqueKeyRoutesFactory("/locatario", LocatarioController);
const routesLocatario = routerLocatario.createRoutes();


export default Router().use([routesLocador, routesLocatario, routesPessoa]);
