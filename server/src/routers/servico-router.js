import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard';
import validarCargos from '../middlewares/validar-cargos';
import Validator from '../middlewares/validator-middleware';

import ServicoController from '../controllers/servico-controller';

class ServicoRouter {

    constructor() {
        this.router = Router();
        this.servicoController = new ServicoController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        //Criar
        this.router.post('/criar-servico',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.servicoController
                .criar.bind(this.servicoController));

        //Listar
        this.router.get('/listar-servicos')
    }


}

export default new ServicoRouter().router;