import AgendaDAO from "../repositories/agendaDAO.js";

const agendaDAO = new AgendaDAO();

const checarAgenda = async (req, res, next) => {

    try{
    const { idAgenda } = req.params;

    const agenda = await agendaDAO.buscarPorID(idAgenda);

    if (!agenda) {
        throw Error('Agenda não encontrada!')
    }

    next();
    } catch(err){
        res.status(404).json({
            err,
            msg: 'Um erro ocorreu!'
        })
    }
};

export default checarAgenda;