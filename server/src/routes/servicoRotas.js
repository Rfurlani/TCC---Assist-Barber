//Importa router express
import { Router } from 'express';

//Importa controller
import {
    cadastrar,
    listarServicos,
    dadosServico,
    atualizarServico,
    deletarServico
} from '../controllers/servicoController.js'

//Inicializa o router
const router = Router();

//Chama as rotas utilizando as funções do controller
router.route('/add').post(cadastrar);
router.route('/').get(listarServicos);
router.route('/:id').get(dadosServico);
router.route('/:id').patch(atualizarServico);
router.route('/:id').delete(deletarServico);


//Exporta o router
export default router;