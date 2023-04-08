import { Request, Response } from "express";

import sessionService from "../services/SessionService";

export default {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const tokenAndUser = await sessionService.login(email, password);

    return res.json(tokenAndUser);
  },

  async getUserByToken(req: Request, res: Response) {
    const { token } = req.body;
    const user = await sessionService.getUserByToken(token);
    return res.json(user);
  }
};
