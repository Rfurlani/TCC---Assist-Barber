//Server e conexão HTTP
import http from "http";
import debug from "debug";
import { config } from "dotenv";
import app from "./app.js";
import './db/mongoose.js'

//Inicializa dotenv || variaveis ambiente
config();

//Instanciando DEBUG, portas e servidos
const DEBUG = debug("dev");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//Excessão não pega
process.on("uncaughtException", (err) => {
  DEBUG(`uncaught exception: ${err.message}`);
  process.exit(1);
});

//Rejeição não tratada
process.on("unhandledRejection", (err) => {
  DEBUG(err);
  DEBUG("Unhandled Rejection:", {
    name: err.name,
    message: err.message || err,
  });
  process.exit(1);
});

//Escuta server em porta
server.listen(PORT, () => {
  DEBUG(
    `server rodando em http://localhost:${PORT} no modo de ${process.env.NODE_ENV}`
  );
});