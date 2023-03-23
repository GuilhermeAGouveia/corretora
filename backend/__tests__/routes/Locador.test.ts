import { Locador } from "@prisma/client";
import exp from "constants";
import request from "supertest";
import app from "../../src/app";

describe("Test endpoint /locador/all [Get all imóvel]", () => {
  test("GET /locador/all", async () => {
    const res = await request(app).get("/locador/all");
    expect(res.status).toBe(200);
  });
  test("GET /locador/get/:cod [Get locador by cod]", async () => {
    const res = await request(app).get(
      "/locador/get/cleve6j9v0000isfqal6n522pq"
    );
    expect(res.status).toBe(200);
  });
 
  test("POST /locador/ [Criar imóvel]", async () => {
    const res = await request(app).post("/locador/");
    expect(res.status).toBe(404); // 404 because the request is empty
  });


});
