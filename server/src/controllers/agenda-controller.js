class AgendaController {

import Agenda from "../domains/agenda-domain";
import AgendaDAO from '../repositories/agendaDAO';
import autorizarOperacao from "../utils/autorizar-operacao";

class AgendaController{

    constructor(){
        this.agendaDAO = new AgendaDAO()
    }

    /**
     * @description Criar uma agenda para o Barbeiro autenticado
     * @api /agenda/barbeiro/:idBarbeiro
     * @access private
     * @type POST
     */

     async criarServico(req, res) {

        try {
            let { idBarbeiro } = req.params;

            let { user } = req;

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let agenda = new Agenda(
                idBarbeiro,
                []
            );
            
            agenda = await this.agendaDAO.criarAgenda(agenda);
            
            return res.status(201).json({
                agenda,
                success: true,
                msg: "Agenda criada com sucesso."
            });

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar a agenda."
            });
        }

    }
}

export default AgendaController;