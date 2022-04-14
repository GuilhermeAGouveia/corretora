import { Router } from 'express';

const router = Router()

const rootPath = '/user';

router.use(rootPath, (req, res, next) => {console.log('passei'); next()})

router.get(`${rootPath}/`, (req, res) => {
    res.send('user!')
})

export default router