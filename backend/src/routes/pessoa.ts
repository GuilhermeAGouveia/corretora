import { Router } from "express";
import LocadorController from "../controller/LocadorController";
import LocatarioController from "../controller/LocatarioController";
import PessoaController from "../controller/PessoaController";
import UniqueKeyRoutesFactory from "./factory/UniqueKeyRoutesFactory";


const routerPessoa = new UniqueKeyRoutesFactory("/pessoa", PessoaController);
const routesPessoa = routerPessoa.createRoutes();

const routerLocador = new UniqueKeyRoutesFactory("/pessoa/locador", LocadorController);
const routesLocador = routerLocador.createRoutes();

const routerLocatario = new UniqueKeyRoutesFactory("/pessoa/locatario", LocatarioController);
const routesLocatario = routerLocatario.createRoutes();


export default Router().use([routesLocador, routesLocatario, routesPessoa]);
