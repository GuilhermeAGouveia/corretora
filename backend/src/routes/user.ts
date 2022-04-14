import { Router } from 'express';

const router = Router()

router.use('/user', (req, res, next) => {console.log('passei'); next()})

router.get('/user/', (req, res) => {
    res.send('user!')
})

export default router