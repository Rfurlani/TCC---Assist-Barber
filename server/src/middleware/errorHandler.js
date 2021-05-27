//Trata errors e mensagens de erros de acordo com o ambiente.
import { config } from "dotenv";
import debug from "debug";

config();

const DEBUG = debug("dev");

export default (err, request, response, next) => {
  const isProducao = process.env.NODE_ENV === "producao";
  let mensagemErr = {};

  if (response.headersSent) {
    return next(err);
  }

  //Se não for um ambiente de produção trata erros como ambiente de desenvolvimento.
  if (!isProducao) {
    DEBUG(err.stack);
    mensagemErr = err;
  }

  return response.status(err.statusCode || 500).json({
    status: "error",
    error: {
      mensagem: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(!isProducao && { trace: mensagemErr }),
    },
  });
};