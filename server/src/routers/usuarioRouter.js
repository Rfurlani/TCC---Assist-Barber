import { Router } from 'express';

//Instanciando Router
const router = Router();

//Middlewares
import { usuarioAuth } from '../middlewares/auth-guard';
import Validator from '../middlewares/validator-middleware';
import { ValidacaoAutenticacao, ValidacaoCadastro } from '../validators';

//Funcões Controller
import {
    cadastrarUsuario, deslogarUsuario, getUsuario, logarUsuario
} from '../controllers/usuarioControl'

//Rotas
router.route("/api/cadastrar-cliente").post(
        ValidacaoCadastro,
        Validator,
        cadastrarUsuario
    );

router.route("/api/cadastrar-barbeiro").post(
        ValidacaoCadastro,
        Validator,
        cadastrarUsuario
    );

router.route("/api/autenticar").post(
        ValidacaoAutenticacao,
        Validator,
        logarUsuario
    );

router.route("/api/autenticar").get(
        usuarioAuth,
        getUsuario
    );

router.route("/api/logout").get(
        usuarioAuth,
        deslogarUsuario
    )


export default router;