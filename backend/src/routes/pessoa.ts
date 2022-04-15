import { Router } from 'express';
import PessoaController from '../controller/PessoaController';

const router = Router()

const rootPath = '/pessoa';

router.get(`${rootPath}/`, PessoaController.default)
router.get(`${rootPath}/all`, PessoaController.getAll)
router.get(`${rootPath}/count`, PessoaController.countPessoa)

router.post(`${rootPath}/`, PessoaController.insert)

export default router