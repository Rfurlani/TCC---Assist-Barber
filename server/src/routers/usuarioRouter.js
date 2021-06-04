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
router.post("/api/cadastrar-cliente",
    ValidacaoCadastro,
    Validator,
    async (req, res) => {
        await cadastrarUsuario(req, "cliente", res);
    });

router.post("/api/cadastrar-barbeiro",
    ValidacaoCadastro,
    Validator,
    async (req, res) => {
        await cadastrarUsuario(req, "barbeiro", res);
    });

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