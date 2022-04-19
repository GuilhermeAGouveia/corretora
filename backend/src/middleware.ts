import { NextFunction, Request, Response } from "express";
import moment from "moment";

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
