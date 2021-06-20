import ServicoDAO from "../repositories/servicoDAO";

const checarServico = async (req, res, next) => {

    const servicoDAO = new ServicoDAO();

    try{
    const { id } = req.params;

    const servico = await servicoDAO.buscarPorID(id);

    if (!servico) {
        throw new Error('Servico não encontrado!')
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