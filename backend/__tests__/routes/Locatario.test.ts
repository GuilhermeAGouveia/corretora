import exp from "constants";
import request from "supertest";
import app from "../../src/app";

describe("Test endpoint /locatario/all [Get all imóvel]", () => {
  test("GET /locatario/all", async () => {
    const res = await request(app).get("/locatario/all");
    expect(res.status).toBe(200);
  });
  test("GET /locatario/get/:cod [Get locatario by cod]", async () => {
    const res = await request(app).get(
      "/locatario/get/cleve6j9v0000isfqal6n522pq"
    );
    expect(res.status).toBe(200);
  });
 
  test("POST /locatario/ [Criar imóvel]", async () => {
    const res = await request(app).post("/locatario/");
    expect(res.status).toBe(404); // 404 because the request is empty
  });


});
