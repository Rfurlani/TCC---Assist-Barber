import { Router } from "express";

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';

import AgendaController from "../controllers/agenda-controller.js";

class AgendaRouter {
    constructor() {
        this.router = Router();
        this.validator = Validator;
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.agendaController = new AgendaController();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/get-agenda',
            this.usuarioAuth,
            this.validator,
            this.agendaController
                .getAgenda.bind(this.agendaController));

        this.router.post('/:idAgendaCliente/agenda-barbeiro/:idAgendaBarbeiro/solicitar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.agendaController
                .solicitarAgendamento.bind(this.agendaController));


        this.router.get('/:idAgenda/horarios',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.agendaController
                .listarHorarios.bind(this.agendaController));

        this.router.patch('/:idAgenda/agendamento/:idAgendamento/alterar-agendamento',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.agendaController
                .alterarAgendamento.bind(this.agendaController));
    }
}

export default new AgendaRouter().router;