import AgendamentoDAO from "../repositories/agendamentoDAO.js";

const checaSolicitacao = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        const status = 'solicitacao';

        let agendamento = await agendamentoDAO.buscarAgendamentoSolicitacao(idAgendaCliente, idAgendaBarbeiro, status)

        if(agendamento !== null){
            throw new Error('Já possui uma solicitação com este barbeiro!');
        }
        
        next();
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! \n ${err.message}`
        })

    }

}

export default checaSolicitacao;