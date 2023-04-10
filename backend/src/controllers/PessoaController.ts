import { Request, Response } from "express";
import PessoaService from "../services/PessoaService";
import encrypt from "../utils/encrypt";
import { PessoaWithTelefone } from "../utils/pessoa/interfaces";
import { Controller } from "../interfaces";

export default {
  count: async (req: Request, res: Response) => {
    const count = await PessoaService.count();
    res.json(count);
  },
  default: async (req: Request, res: Response) => {
    res.send("Raiz para pessoa");
  },
  getByCod: async (req: Request, res: Response) => {
    const id: string = req.params.cod;
    const pessoa = await PessoaService.getByCod(id);
    res.json(pessoa);
  },
  getAll: async (req: Request, res: Response) => {
    const pessoa = await PessoaService.getAll();

    res.json(pessoa);
  },

  insert: async (req: Request, res: Response) => {
    try {
      //phones_ é um atributo de Pessoa que vem do front-end, que é um array de strings
      //phones é um atributo da interface Pessoa do back-end, que é um array de objetos {numero: string}[]
      const { phones_, ...pessoa } = req.body as PessoaWithTelefone & {
        phones_?: string[];
      };

      //convertendo phones_ (string[]) para phones ({numero: string}[]) propriedade da interface Pessoa
      pessoa.phones = phones_ && phones_.map((numero) => ({ numero }));

      const pessoaInsert = await PessoaService.insert(pessoa);
      res.status(201).json(pessoaInsert)
    } catch (error: any) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const cod = req.params.cod;

      const pessoa = await PessoaService.delete(cod);

      return res.json(pessoa);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  },
} as Controller;
