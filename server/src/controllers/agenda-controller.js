import Agenda from "../domains/agenda-domain.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import AgendamentoController from "./agendamento-controller.js";
import UsuarioDAO from "../repositories/usuarioDAO.js";
import NotificacaoController from "./notificacao-controller.js";

class AgendaController {

    constructor() {
        this.agendaDAO = new AgendaDAO();
        this.agendamentoController = new AgendamentoController();
        this.usuarioDAO = new UsuarioDAO();
        this.notificacaoController = new NotificacaoController();
        if(this.constructor === AgendaController){
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
    }

    /**
     * @description Criar uma agenda para o usuario cadastrado
     */

    async criarAgenda(idUsuario) {
        try {

            let agenda = new Agenda(
                idUsuario,
                []
            );

            return await this.agendaDAO.criarAgenda(agenda);

        } catch (err) {

            return err;

        }
    }

    /**
     * @description Busca informações da agenda do usuario autenticado
     */

    async getAgenda(idUsuario) {
        try {
            let agenda = await this.agendaDAO.buscarPorUsuarioId(idUsuario);

            if(agenda === null){
                throw new Error('Agenda não encontrada!')
            }

            return agenda;

        } catch (err) {

            return err;

        }
    }

    /**
     * @description Busca informações de um agendamento específico
     */

    async getAgendamento(id){

        try {

            let agendamento = await this.agendamentoController.getAgendamento(id);

            if(agendamento === null){
                throw new Error('Agendamento não encontrado!')
            }
            
            return agendamento;

        } catch (err) {
            return err;
        }
        
    }

    /**
     * @description Exclui agenda
     */

    async excluirAgenda(id){
        try {

            const agenda = await this.agendaDAO.excluirAgenda(id);

            if(agenda === null){
                throw new Error('Agenda inexistente!')
            }

        } catch (err) {

            return err;

        } 
    }

}

export default AgendaController;