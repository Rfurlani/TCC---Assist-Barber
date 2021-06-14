import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import AgendaBarbeiroController from "../controllers/agenda-barbeiro-controller.js";

class AgendaRouter {

    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.agendaBarbeiroController = new AgendaBarbeiroController();
        this.loadRoutes();
    }

    loadRoutes() {

        this.router.get('/cliente/buscar-agenda',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.agendaBarbeiroController
                .buscarAgenda.bind(this.agendaBarbeiroController));

        //AGENDAMENTOS
        /*this.router.post('/:idAgenda/criar-requisicao',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.agendaController
                .solicitarAgendamento.bind(this.agendaController));

        this.router.get('/:idAgenda/agendamentos',
            this.usuarioAuth,
            this.validator,
            this.agendaController
                .listarAgendamentos.bind(this.agendaController));

        this.router.patch('/:idAgenda/agendamento/:idAgendamento/alterar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.agendaController
                .alterarAgendamento.bind(this.agendaController));*/
    }

}

export default new AgendaRouter().router;