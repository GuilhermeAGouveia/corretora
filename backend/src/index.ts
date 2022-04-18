import express from "express";
import { AddressInfo } from "net";
import associadoRouter from "./routes/associado";
import imvRouter from "./routes/imovel";
import pessoaRouter from "./routes/pessoa";
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use([pessoaRouter, imvRouter, associadoRouter]);
app.get("/", (req, res) => {
  res.send("Hello, Heroku!");
});

const server = app.listen(process.env.PORT || 3333, () => {
  var { port, address } = server.address() as AddressInfo;
  console.log(`App listening at ${address} on port ${port}!`);
});
