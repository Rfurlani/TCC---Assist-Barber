import { Router } from 'express';

//Instanciando Router
const router = Router();

//Importando Middlewares
import checarCargo from '../middlewares/checa-cargos';
import { usuarioAuth } from '../middlewares/auth-guard';
import Validator from '../middlewares/validator-middleware';
import { ValidacaoServico } from '../validators/servico-validators';

//Funcões Controller
import {
    criarServico, editarServico, excluirServico, listarServicos
} from '../controllers/servicoControl';

//Rotas
router.route("/api/criar-servico").post(
    usuarioAuth,
    Validator,
    checarCargo(["Barbeiro"]),
    ValidacaoServico,
    criarServico
);

router.route("/api/editar-servico/:id").put(
    usuarioAuth,
    Validator,
    checarCargo(["Barbeiro"]),
    ValidacaoServico,
    editarServico
);

router.route("/api/deletar-servico/:id").delete(
    usuarioAuth,
    checarCargo(["Barbeiro"]),
    excluirServico
);

router.route("/api/listar-servicos").get(
    usuarioAuth,
    listarServicos
);


export default router;