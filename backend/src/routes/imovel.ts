import { Router } from 'express';
import ImovelController from '../controller/ImovelController';

const router = Router()

const rootPath = '/imovel';


router.get(`${rootPath}/`, ImovelController.default)
router.get(`${rootPath}/count`, ImovelController.countImovel)
router.get(`${rootPath}/all`, ImovelController.getAll)

export default router