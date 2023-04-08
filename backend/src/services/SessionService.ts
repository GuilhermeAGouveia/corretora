import encrypt from "../utils/encrypt";
import jwt from "jsonwebtoken";
import { Pessoa, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  login: async (email: string, password: string) => {
    const user = await prisma.pessoa.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isMatch = await encrypt.compare(password as string, user.password);

    user.password = ""; // delete password from response and jwt payload

    if (!isMatch) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign({ user }, process.env.SECRET as string, {
      expiresIn: 3600, // 1h
    });

    return {
      token,
      user,
    };
  },

  getUserByToken: (token: string) => {
    if (!token) {
      throw new Error("Token não encontrado");
    }

    return new Promise((resolve, reject) => {
      jwt.verify(
        token as string,
        process.env.SECRET as string,
        function (err: any, decoded: any) {
          if (err) reject(err);
          resolve(decoded);
        }
      );
    });
  },
};
