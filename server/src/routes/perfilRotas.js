//Importa router express
import { Router } from 'express';

//Importa controller
import {
    cadastrar
} from '../controllers/servicoController.js'

//Inicializa o router
const router = Router();

//Chama as rotas utilizando as funções do controller
router.route('/cadastro').post(cadastrar);

//Exporta o router
export default router;