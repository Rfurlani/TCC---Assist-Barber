import express from "express";
import logger from "morgan";
import { config } from "dotenv";
import errorHandler from "./middleware/errorHandler";
import { erroNaoEncontrado } from "./helpers/errors";

//Inicializa dotenv || variaveis ambienete
config()
//Express
const app = express();

//Logger colorido de desenvolvimento
if (["desenvolvimento", "producao"].includes(process.env.NODE_ENV)) {
  app.use(logger("dev"));
}

//Get normal
app.get("/", (_, res) => {
  res.status(200).json({
    status: "sucesso",
    message: "Bem vindo!",
  });
});

//Joga erro para rotas não encontradas
app.all("*", (_, res) => {
  throw new erroNaoEncontrado('Recurso não encontrado neste server!')
});

//Inicializa express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Inicializa tratamento de erros
app.use(errorHandler);

export default app;