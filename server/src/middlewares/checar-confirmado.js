import AgendamentoDAO from "../repositories/agendamentoDAO.js";

const checarConfirmado = async (req, res, next) =>{

    const agendamentoDAO = new AgendamentoDAO();
    try {
        const { idAgendaCliente, idAgendaBarbeiro } = req.params;

        let agendamento = await agendamentoDAO.buscarAgendamentoConfirmado(idAgendaCliente, idAgendaBarbeiro)

        if(agendamento !== null){
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

export default checarConfirmado;