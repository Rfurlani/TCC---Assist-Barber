//Conexão com o banco de dados
import mongoose from "mongoose";
import { config } from "dotenv";
import debug from "debug";

//Inicializa dotenv || variaveis ambiente
config();
const DEBUG = debug("dev");

//Pega variaveis ambiente
const { NODE_ENV,  DB_URL} = process.env;

//Opções de BD
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

//Estabelece conexão
mongoose
  .connect(DB_URL, options)
  .then(() => {
    DEBUG("MongoDB está conectado!");
  })
  .catch((err) => {
    DEBUG("MongoDB fallhou em estabelecer conexão!");
    DEBUG(err);
  });