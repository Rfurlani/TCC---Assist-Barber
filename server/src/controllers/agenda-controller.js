import Agenda from "../domains/agenda-domain.js";
import AgendaDAO from '../repositories/agendaDAO.js';
import autorizarOperacao from "../utils/autorizar-operacao.js";

class AgendaController{

    constructor(){
        this.agendaDAO = new AgendaDAO();
    }

    /**
     * @description Criar uma agenda para o Barbeiro autenticado
     * @api /agenda/criar-agenda/
     * @access private
     * @type POST
     */

     async criarAgenda(req, res) {

        try {
            const id = req.user._id;

            let agenda = new Agenda(
                id,
                []
            );
            
            agenda = await this.agendaDAO.criarAgenda(agenda);
            
            return res.status(201).json({
                agenda,
                success: true,
                msg: "Agenda criada com sucesso."
            });

        } catch (err) {
            console.log(err.message);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de criar a agenda."
            });
        }

    }

    /**
     * @description Busca informações da agenda do Barbeiro autenticado
     * @api /agenda/barbeiro/buscar-agenda
     * @access private
     * @type GET
     */

     async buscarAgenda(req, res) {

        try {
            const idBarbeiro = req.user._id;

            let agenda = await this.agendaDAO.buscarPorBarbeiro(idBarbeiro);

            return res.status(200).json({
                agenda,
                msg: "Agenda pega com sucesso!"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }
}

export default AgendaController;