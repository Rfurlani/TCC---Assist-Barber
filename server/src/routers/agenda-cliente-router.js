import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';
import checarSolicitacao from "../middlewares/checar-solicitacao.js";
import checarAvaliacao from "../middlewares/checar-avaliacao.js";
import checarConfirmado from "../middlewares/checar-confirmado.js";
import checarSolicitacaoCancelamento from "../middlewares/checar-solicitacao-cancelamento.js";

import AgendaClienteController from "../controllers/agenda-cliente-controller.js";

class AgendaClienteRouter {
    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.agendaClienteController = new AgendaClienteController();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/get-agenda',
            this.usuarioAuth,
            this.validator,
            this.agendaClienteController
                .getAgenda.bind(this.agendaClienteController));

        this.router.get('/get-agendamento/:id',
            this.usuarioAuth,
            this.validator,
            this.agendaClienteController
                .getAgendamento.bind(this.agendaClienteController));

        this.router.patch('/agendamento/:idAgendamento/solicitiar-cancelamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            checarSolicitacaoCancelamento,
            this.agendaClienteController
                .solicitarCancelamento.bind(this.agendaClienteController));

        this.router.post('/:idAgendaCliente/agenda-barbeiro/:idAgendaBarbeiro/solicitar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            checarSolicitacao,
            checarConfirmado,
            this.agendaClienteController
                .solicitarAgendamento.bind(this.agendaClienteController));


        this.router.get('/:idAgendaBarbeiro/horarios',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.agendaClienteController
                .listarHorarios.bind(this.agendaClienteController));

        this.router.post('/historico-cliente/agendamento/:idAgendamento/criar-avaliacao',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            checarAvaliacao,
            this.agendaClienteController
                .avaliarBarbeiro.bind(this.agendaClienteController));
    }
}

export default new AgendaClienteRouter().router;