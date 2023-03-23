import { Pessoa } from "@prisma/client";
import exp from "constants";
import request from "supertest";
import app from "../../src/app";
import { Page } from "../../src/interfaces";
import { PessoaWithTelefone } from "../../src/utils/pessoa/interfaces";

const pessoaTest = {
  firstName: "Guilherme",
  lastName: "Gouveia",
  email: `teste${Math.round(Math.random() * 10000)}@gmail.com`,
  password: "gui123",
  address: "string",
  city: "string",
  state: "string",
  cep: "string",
  phones_: ["(35) 997232378"],
  birthdate: "26/12/2001",
};

var pessoaTestCod: string;

describe("Test endpoint /pessoa/all [Get all imóvel]", () => {
  test("GET /pessoa/all", async () => {
    const res = await request(app).get("/pessoa/all");
    expect(res.status).toBe(200);
  });

 
  test("POST /pessoa/ [Criar imóvel]", async () => {
    const res = await request(app).post("/pessoa/").send(pessoaTest);
    pessoaTestCod = res.body.id;
    expect(res.status).toBe(200);
  });

  test("GET /pessoa/get/:cod [Get pessoa by cod]", async () => {
    const res = await request(app).get(
      "/pessoa/get/" + pessoaTestCod
    );
    expect(res.status).toBe(200);
  });

  test("POST /pessoa/ [Criar imóvel com email repetido]", async () => {
    const res = await request(app).post("/pessoa/").send(pessoaTest);
    expect(res.status).toBe(400);
  });

  test("DELETE /pessoa/:cod [Deletar imóvel]", async () => {
    const res = await request(app).delete("/pessoa/" + pessoaTestCod) as {body: PessoaWithTelefone, status: number};
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(pessoaTestCod);
  });

});
