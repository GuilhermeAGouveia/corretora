import { Router } from 'express';
import CorretorController from '../controller/CorretorController';
import LocadorController from '../controller/LocadorController';

const router = Router()

const rootPath = '/pessoa';

//locador
router.get(`${rootPath}/locador/`, LocadorController.default)
router.get(`${rootPath}/locador/all`, LocadorController.getAll)
router.get(`${rootPath}/locador/count`, LocadorController.count)
router.post(`${rootPath}/locador/`, LocadorController.insert)

//corretor

router.get(`${rootPath}/corretor/`, CorretorController.default)
router.get(`${rootPath}/corretor/all`, CorretorController.getAll)
router.get(`${rootPath}/corretor/count`, CorretorController.count)
router.post(`${rootPath}/corretor`, CorretorController.insert)

//locatario


export default router