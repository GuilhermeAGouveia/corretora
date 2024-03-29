require('dotenv').config();
import express from "express";
import morgan from "morgan";
import associadoRouter from "./routes/associado";
import contratoRouter from "./routes/contrato";
import imageRouter from "./routes/image";
import imvRouter from "./routes/imovel";
import pessoaRouter from "./routes/pessoa";
import sessionRouter from "./routes/session";
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
  contratoRouter,
  imageRouter,
  sessionRouter,
]);

app.get("/", (req, res) => {
  res.json({"message": "Hello!"});
});

export default app
