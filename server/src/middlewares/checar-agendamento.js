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

export{ 
    checarCancelamento
};