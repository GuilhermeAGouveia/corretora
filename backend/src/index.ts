import express from "express";
import morgan from "morgan";
import { AddressInfo } from "net";
import associadoRouter from "./routes/associado";
import contratoRouter from "./routes/contrato";
import corretorLocadorRouter from "./routes/corretorLocador";
import imvRouter from "./routes/imovel";
import pessoaRouter from "./routes/pessoa";
import telefoneRouter from "./routes/telefone";

const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Roteamento
app.use([
  pessoaRouter,
  imvRouter,
  associadoRouter,
  telefoneRouter,
  corretorLocadorRouter,
  contratoRouter,
]);

app.get("/", (req, res) => {
  res.send("Hello, Heroku!");
});

const server = app.listen(process.env.PORT || 3333, () => {
  var { port, address } = server.address() as AddressInfo;
  console.log(`App listening at ${address} on port ${port}!`);
});
