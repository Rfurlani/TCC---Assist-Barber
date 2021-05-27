import authRotas from "./routes/authRotas.js";
import express from "express";
import logger from "morgan";
import { config } from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import { erroNaoEncontrado } from "./helpers/errors.js";

//Inicializa dotenv || variaveis ambiente
config();

//Express
const app = express();

//Logger colorido de desenvolvimento
if (["desenvolvimento", "producao"].includes(process.env.NODE_ENV)) {
  app.use(logger("dev"));
}

//Executa express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Executa cookie-parser
app.use(cookieParser());
//Inicializa passport
passport.initialize();

//Rotas
app.use('/auth', authRotas);

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

//Executa express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Executa tratamento de erros
app.use(errorHandler);

export default app;