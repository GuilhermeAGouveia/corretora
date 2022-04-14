import { Router } from 'express';

const router = Router()

router.use('/imovel', (req, res, next) => {console.log('passei'); next()})

router.get('/imovel/', (req, res) => {
    res.send('imovel!')
})

export default router