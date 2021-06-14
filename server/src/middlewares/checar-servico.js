import ServicoDAO from "../repositories/servicoDAO";

const servicoDAO = new ServicoDAO();

const checarServico = async (req, res, next) => {

    try{
    const { id } = req.params;

    const servico = await servicoDAO.buscarPorID(id);

    if (!servico) {
        throw Error('Servico não encontrado!')
    }

    next();
    } catch(err){
        res.status(404).json({
            err,
            msg: 'Um erro ocorreu!'
        })
    }
};

export default checarServico;