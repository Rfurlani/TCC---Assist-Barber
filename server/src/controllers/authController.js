//Controlador de autenticação
import passport from "passport";
import debug from "debug";
import passportLocal from "../services/passport/passportLocal.js";
import { erroAplicacao, erroNaoEncontrado } from "../helpers/errors.js";

const DEBUG = debug("dev");
//Cria cookie do token JWT
const createCookieFromToken = (usuario, statusCode, req, res) => {
  const token = usuario.generateVerificationToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      usuario,
    },
  });
};

export default {
//Controlador Cadastro
  cadastrar: async (req, res, next) => {
    passport.authenticate(
      "signup",
      { session: false },
      async (err, usuario, info) => {
        try {
          if (err || !usuario) {
            const { statusCode = 400, message } = info;
            return res.status(statusCode).json({
              status: "error",
              error: {
                message,
              },
            });
          }
          createCookieFromToken(usuario, 201, req, res);
        } catch (error) {
          DEBUG(error);
          throw new erroAplicacao(500, error);
        }
      }
    )(req, res, next);
  },
//Controlador Login
  login: (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, usuario, info) => {
      if (err || !usuario) {
        let message = err;
        if (info) {
          message = info.message;
        }
        return res.status(401).json({
          status: "error",
          error: {
            message,
          },
        });
      }
      // gera um web token filho assinado com os conteúdos do objeto usuário e retorna ela na resposta(callback/response)
      createCookieFromToken(usuario, 200, req, res);
    })(req, res, next);
  },

  protegerRota: async (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        message: "Você entrou na rota protegida!",
      },
    });
  }, 
};