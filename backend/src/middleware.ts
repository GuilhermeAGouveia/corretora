import { NextFunction, Request, Response } from 'express'
import moment from 'moment'

export const convertStringToDateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.birthdate) {
        req.body.birthdate = moment(req.body.birthdate, 'DD/MM/YYYY').toDate()

    }
    next()
}