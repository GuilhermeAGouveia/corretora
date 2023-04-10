import { Request, Response } from "express";

import sessionService from "../services/SessionService";

export default {
  async login(req: Request, res: Response) {
    try {
    const { email, password } = req.body;
    const tokenAndUser = await sessionService.login(email, password);

    return res.json(tokenAndUser);
    } catch (error: any) {
      return res.status(400).json({error: error.message});
    }
  },

  async getUserByToken(req: Request, res: Response) {
    try {
    const { token } = req.body;
    const user = await sessionService.getUserByToken(token);
    return res.json(user);
    } catch (error: any) {
      return res.status(400).json({error: error.message});
    }
  }
};
