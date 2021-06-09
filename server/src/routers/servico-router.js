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
        this.router.post('/barbeiro/:idBarbeiro/criar-servico',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.servicoController
                .criarServico.bind(this.servicoController));

        //Listar Servicos Barbeiro
        this.router.get('/barbeiro/:idBarbeiro/listar-servicos',
            this.usuarioAuth,
            this.validator,
            this.servicoController
                .listarServicosBarbeiro.bind(this.servicoController));

        //Excluir Servico
        this.router.delete('/barbeiro/:idBarbeiro/excluir-servico/:id',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.servicoController
                .excluirServico.bind(this.servicoController));

        //Editar Servico
        this.router.patch('/barbeiro/:idBarbeiro/alterar-servico/:id',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.servicoController
                .alterarServico.bind(this.servicoController));
    }


}

export default new ServicoRouter().router;