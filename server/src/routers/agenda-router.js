import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';
import checarAgenda from '../middlewares/checar-agenda.js';

import AgendaController from "../controllers/agenda-controller.js";

class AgendaRouter {

    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.checarAgenda = checarAgenda;
        this.agendaController = new AgendaController();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/criar-agenda',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.agendaController
                .criarAgenda.bind(this.agendaController));

        this.router.get('/usuario/buscar-agenda',
            this.usuarioAuth,
            this.validator,
            this.checarAgenda,
            this.agendaController
                .buscarAgenda.bind(this.agendaController));

        //AGENDAMENTOS
        this.router.post('/:idAgenda/criar-requisicao',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.checarAgenda,
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
                .alterarAgendamento.bind(this.agendaController));
    }

}

export default new AgendaRouter().router;