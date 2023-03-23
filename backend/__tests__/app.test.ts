import request from "supertest";
import app from "../src/app";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();
describe("Test app.ts", () => {
  test("Root request", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({message: "Hello!"})
  });

  test("SGBD connection", async () => {
    const res = await prisma.$connect();
    expect(res).toEqual(undefined)
  });
});
