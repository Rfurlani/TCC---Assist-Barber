//Importa router express
import { Router } from 'express';

//Importa controller
import {
    cadastrar,
    listarServicos,
    
} from '../controllers/servicoController.js'

//Inicializa o router
const router = Router();

//Chama as rotas utilizando as funções do controller
router.route('/cadastro').post(cadastrar);
router.route('/listarServicos').get(listarServicos);


//Exporta o router
export default router;