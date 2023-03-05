import request from "supertest"
import app from "../../src/app"

describe("Test endpoint /imovel", () => {
  test("GET /imovel", async () => {
    const res = await request(app).get("/imovel/all");
    expect(res.status).toBe(200);
  });
  test("GET /imovel/get/:cod", async () => {
    const res = await request(app).get("/imovel/get/cleve6j9v0000isfqal6n522pq");
    expect(res.status).toBe(200);
  });
});