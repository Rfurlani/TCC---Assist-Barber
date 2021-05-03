//Importa router express
import { Router } from 'express';

//Importa controller
import {
    cadastrar,
    login,
    getUsuario
} from '../controllers/usuarioController.js'

//Inicializa o router
const router = Router();

//Chama as rotas utilizando as funções do controller
router.route('/cadastro').post(cadastrar);
router.route('/login').post(login);
router.route('/usuario').post(getUsuario);

//Exporta o router
export default router;