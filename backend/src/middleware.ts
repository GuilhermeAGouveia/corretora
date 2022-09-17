import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import moment from "moment";

require("dotenv").config()

export const convertStringToDateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Essa rotina é executada para converter a string de data no formato dd/mm/yyyy em um objeto Date.
    // Basicamente, ela processa todas as propriedades do objeto recursivamente, e para cada propriedade
    // que tem date no nome (como birthdate), converte seu valor para um objeto Date.
    function proccessDateInJsonRecursive(obj: any) {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "object") {
                proccessDateInJsonRecursive(obj[key]);
            } else {
                if (key.toLowerCase().includes("date")) {
                    obj[key] = moment(obj[key], "DD/MM/YYYY").toDate();
                }
            }
        });
    }

    proccessDateInJsonRecursive(req.body);

    next();
};

export function verifyJWT(
    req: Request,
    res: Response,
    next: NextFunction
) {
    var token = (req.headers["Authorization"] as string)?.split(" ")[1];
    if (!token) return res.sendStatus(400);
    jwt.verify(
        token as string,
        process.env.SECRET as string,
        function (err: any, decoded: any) {
            if (err) return res.sendStatus(403);
            req.body.auth = {
                ...decoded,
            };
            next();
        }
    );
}

// Este middleware captura uma resposta getAll e converte em uma página.
// Essa solução para paginação é muito simples, mas não é a melhor.

export function paginate(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.params.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    let oldSend = res.json
    res.json = function (data) {
        const newData = data.slice(limit * (page - 1), limit * page)
        res.json = oldSend
        return res.json({
            data: newData,
            total: data.length,
        }) // paginate the result
    }
    next()
}