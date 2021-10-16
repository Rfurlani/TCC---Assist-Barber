import AgendamentoDAO from "../repositories/agendamentoDAO.js";
const agendamentoDAO = new AgendamentoDAO();

const checarAgendamento = async (req, res, next) => {
    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento === null) {
            throw Error('Agendamento não existe');
        }

        next();
    } catch (err) {

        res.status(500).json({
            err,
            msg: `Um erro ocorreu! 
            ${err.message}`
        })

    }
}

const checarCancelamento = async (req, res, next) => {

    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento.status === 'cancelado' || agendamento.status === 'finalizado') {
            throw new Error(`Agendamento não pode ser cancelado pois já foi ${agendamento.status}`);
        }

        next();
    } catch (err) {

        res.status(500).json({
            err,
            msg: `Um erro ocorreu! 
            ${err.message}`
        })

    }

}

const checarConfirmacao = async (req, res, next) => {

    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento.status === 'cancelado' || agendamento.status === 'finalizado' || agendamento.status == 'confirmado') {
            throw new Error(`Agendamento não pode ser confirmado pois já foi ${agendamento.status}`);
        }

        next();

    } catch (err) {

        res.status(500).json({
            err,
            msg: `Um erro ocorreu!
             ${err.message}`
        })

    }

}

const checarFinalizar = async (req, res, next) => {

    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento.status === 'cancelado'
            || agendamento.status === 'finalizado'
            || agendamento.status == 'solicitacao') {
            throw new Error(`Agendamento não pode ser finalizado pois está em estado ${agendamento.status}`);
        }

        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err,
            msg: `Um erro ocorreu! 
            ${err.message}`
        })

    }

}

const checarSolicitacao = async (req, res, next) => {

    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        const status = 'solicitacao';

        let agendamento = await agendamentoDAO.buscarStatusAgendamento(idAgendaCliente, idAgendaBarbeiro, status)

        if(agendamento.status === 'confirmado' || agendamento.status === 'solicitacao'){
            throw new Error(`Já possui um agendamento em estado '${agendamento.status}' com este barbeiro!`);
        } 
        
        next();
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu!
             ${err.message}`
        })

    }

}

const checarConfirmado = async (req, res, next) => {

    try {

        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento.status !== 'confirmado'){
            throw Error(`Status do agendamento não é 'confirmado!'`)
        }

        next();
        
    } catch (err) {
        
        res.status(500).json({
            err,
            msg: `Um erro ocorreu!
             ${err.message}`
        })

    }
}

const checarAvaliacao = async (req, res, next) => {

    try {
        const { idAgendamento } = req.params;

        let agendamento = await agendamentoDAO.buscarPorID(idAgendamento);

        if (agendamento.avaliacao !== null) {
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

export {
    checarAgendamento,
    checarCancelamento,
    checarConfirmacao,
    checarConfirmado,
    checarSolicitacao,
    checarAvaliacao,
    checarFinalizar
};