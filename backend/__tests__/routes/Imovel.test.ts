import { Imovel } from "@prisma/client";
import exp from "constants";
import request, {Response} from "supertest";
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
  birthdate: "26/12/2001",
};

const createImovelTest = (cod_lcd: string) => ({
  address: "900, 90",
  area: 100,
  cep: "ola",
  city: "Congonhal",
  cod_lcd,
  district: "sms",
  mensalidade: 10,
  nApto: 940,
  state: "MG",
  type: "CASA",
});

var imovelTestCod: string;
var pessoaTestCod: string;
beforeAll(async () => {
  const res = await request(app).post("/pessoa/").send(pessoaTest); // create a user to be associated with the pessoa
  pessoaTestCod = res.body.id;
});
afterAll(async () => {
  await request(app).delete("/pessoa/" + pessoaTestCod); // delete the user created
});
describe("Test endpoint /imovel/all [Get all imóvel]", () => {
  test("GET /imovel/all", async () => {
    const res = await request(app).get("/imovel/all");
    expect(res.status).toBe(200);
  });
  test("POST /imovel/ [Criar imóvel]", async () => {
    const res = await request(app)
      .post("/imovel/")
      .send(createImovelTest(pessoaTestCod));
    imovelTestCod = res.body;
    expect(res.status).toBe(201);
  });
  test("GET /imovel/get/:cod [Get imovel by cod]", async () => {
    const res = await request(app).get("/imovel/get/" + imovelTestCod);
    expect(res.status).toBe(200);
  });
  test("GET imovel/filter/1?price=10-5000&limit=5 [Filtros de imóvel]", async () => {
    const {
      body: { data, ...rest },
    } = (await request(app).get("/imovel/filter/1?price=10-5000&limit=5")) as {
      body: Page<Imovel>;
    };

    expect(data.length).toBeLessThanOrEqual(5);
    data.forEach((imovel: Imovel) => {
      expect(imovel.price).toBeLessThanOrEqual(5000);
      expect(imovel.price).toBeGreaterThanOrEqual(10);
    });
  });
  test("DELETE /imovel/:cod [Deletar imóvel]", async () => {
    const res = (await request(app).delete("/imovel/" + imovelTestCod)) as {
      body: Imovel;
      status: number;
    };
    expect(res.status).toBe(200);
    expect(res.body.cod_imv).toBe(imovelTestCod);
  });
  test("GET /imovel/page [Página de imóvel]", async () => {
    const res = await request(app).get("/imovel/page/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("hasNext");
  });
});
