import AgendamentoDAO from "../repositories/agendamentoDAO.js";

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

export default checarAvaliacao;