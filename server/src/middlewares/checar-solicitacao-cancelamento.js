import AgendamentoDAO from "../repositories/agendamentoDAO.js";

const checarSolicitacaoCancelamento = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        let agendamento = await agendamentoDAO.buscarAgendamentoSolicitacaoCancelamento(idAgendaCliente, idAgendaBarbeiro)

        if(agendamento !== null){
            throw new Error('Já pediu solicitação de cancelamento a este barbeiro!');
        }
        
        next();
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! \n ${err.message}`
        })

    }

}

export default checarSolicitacaoCancelamento;