import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import encrypt from "../utils/bcrypt";

const prisma = new PrismaClient();

export default {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.pessoa.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const isMatch = await encrypt.compare(password, user.password);

    user.password = ""; // delete password from response and jwt payload

    if (!isMatch) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ user }, process.env.SECRET as string, {
      expiresIn: 3600, // 1h
    });

    return res.json({
      token,
      user,
    });
  },

  getUserByToken(req: Request, res: Response) {
    const { token } = req.body;
    if (!token) {
      return res.sendStatus(400);
    }

    jwt.verify(
      token as string,
      process.env.SECRET as string,
      function (err: any, decoded: any) {
        if (err) return res.sendStatus(403);
        return res.json({
          ...decoded,
        });
      }
    );
  }
};
