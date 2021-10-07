import AgendamentoDAO from "../repositories/agendamentoDAO.js";

const checarCancelamento = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendamento } = req.params;
        const { body } = req;

        if(body.status != 'cancelado'){
            throw new Error('Status inválido');
        }

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento)

        if(agendamento === null){
            throw new Error('Agendamento não existe!')
        } else if(agendamento.status === 'cancelado' || agendamento.status === 'finalizado'){
            throw new Error(`Agendamento não pode ser cancelado pois já foi ${agendamento.status}`);
        }
        
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! ${err.message}`
        })

    }

}

const checarConfirmado = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        let agendamento = await agendamentoDAO.buscarAgendamentoClienteBarbeiro(idAgendaCliente, idAgendaBarbeiro)

        if(agendamento !== null && agendamento.status == 'confirmado'){
            throw new Error('Já possui um agendamento confirmado com este barbeiro!');
        }
        
        next();
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! \n ${err.message}`
        })

    }

}

const checarSolicitacao = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        const status = 'solicitacao';

        let agendamento = await agendamentoDAO.buscarStatusAgendamento(idAgendaCliente, idAgendaBarbeiro, status)

        if(agendamento.status === 'solicitacao'){
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

const checarAvaliacao = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if(agendamento.avaliacao !== null ){
            throw new Error('Esse agendamento já foi avaliado!');
        }
        
        next();
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! \n ${err.message}`
        })

    }

}

export{ 
    checarCancelamento,
    checarConfirmado,
    checarSolicitacao,
    checarAvaliacao
};