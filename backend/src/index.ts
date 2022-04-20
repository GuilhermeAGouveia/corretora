require('dotenv').config();
import express from "express";
import morgan from "morgan";
import { AddressInfo } from "net";
import associadoRouter from "./routes/associado";
import contratoRouter from "./routes/contrato";
import corretorLocadorRouter from "./routes/corretorLocador";
import imageRouter from "./routes/image";
import imvRouter from "./routes/imovel";
import pessoaRouter from "./routes/pessoa";
import telefoneRouter from "./routes/telefone";

const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // support json encoded bodies (parser)
app.use(express.urlencoded({ extended: true })); // support encoded bodies in application/x-www-form-urlencoded (parser)

// Roteamento
app.use([
  pessoaRouter,
  imvRouter,
  associadoRouter,
  telefoneRouter,
  corretorLocadorRouter,
  contratoRouter,
  imageRouter,
]);

app.get("/", (req, res) => {
  res.send("Hello, Heroku!");
});

const server = app.listen(process.env.PORT || 3333, () => {
  var { port, address } = server.address() as AddressInfo;
  console.log(`App listening at ${address} on port ${port}!`);
});
