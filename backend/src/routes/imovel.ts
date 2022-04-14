import { Router } from 'express';

const router = Router()

const rootPath = '/imovel';

router.use(rootPath, (req, res, next) => {console.log('passei'); next()})

router.get(`${rootPath}/`, (req, res) => {
    res.send('imovel!')
})

export default router