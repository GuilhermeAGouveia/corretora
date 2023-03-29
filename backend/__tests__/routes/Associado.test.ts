import { Associado } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";


const pessoaTest = {
  firstName: "Guilherme",
  lastName: "Gouveia",
  email: `teste${Math.round(Math.random() * 10000)}@gmail.com`,
  password: "gui123",
  address: "string",
  city: "string",
  state: "string",
  cep: "string",
  birthdate: "26/12/2001",
};

const createAssociadoTest = (cod_lct: string) => ({
  "name": "Terezinha Gouveia",
  cod_lct,
  "birthdate": "03/10/1980",
  "tipo": "MAE"
})


var pessoaTestCod: string;
beforeAll(async () => {
  const res = await request(app).post("/pessoa/").send(pessoaTest); // create a user to be associated with the pessoa
  pessoaTestCod = res.body.id;
});
afterAll(async () => {
  await request(app).delete("/pessoa/" + pessoaTestCod); // delete the user created
});

describe("Test endpoint /associado", () => {
  test("GET /associado/all", async () => {
    const res = await request(app).get("/associado/all");
    expect(res.status).toBe(200);
  });
  test("POST /associado/ [Criar imóvel]", async () => {
    const res = await request(app).post("/associado/").send(createAssociadoTest(pessoaTestCod));
    expect(res.body).toBe(createAssociadoTest(pessoaTestCod).name);
    expect(res.status).toBe(200);
  });
  test("GET /associado/get/?cod_lct=<cod>&name=<name> [Get associado by cod]", async () => {
    const res = await request(app).get(
      `/associado/get?cod_lct=${pessoaTestCod}&name=${createAssociadoTest(pessoaTestCod).name}`
    );
    expect(res.status).toBe(200);
  });


  test("POST /associado/ [Criar imóvel com email repetido]", async () => {
    const res = await request(app).post("/associado/").send(createAssociadoTest(pessoaTestCod));
    expect(res.status).toBe(400);
  });

  test("DELETE /associado/?cod_lct=<cod>&name=<name> [Deletar imóvel]", async () => {
    const res = (await request(app).delete(`/associado?cod_lct=${pessoaTestCod}&name=${createAssociadoTest(pessoaTestCod).name}`)) as {
      body: Associado;
      status: number;
    };
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(createAssociadoTest(pessoaTestCod).name);
  });
});
