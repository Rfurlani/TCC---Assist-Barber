//Importa router express
import { Router } from 'express';

//Importa controller
import {
    cadastro,
    login,
    getUsuario,
    alterarUsuario,
    //deletarUsuario
} from '../controllers/usuarioController.js'

//Inicializa o router
const router = Router();

//Chama as rotas utilizando as funções do controller
router.route('/cadastrar').post(cadastro);
router.route('/login').post(login);
router.route('/usuario').post(getUsuario);
router.route('/').patch(alterarUsuario);
//router.route('/').delete();

//Exporta o router
export default router;