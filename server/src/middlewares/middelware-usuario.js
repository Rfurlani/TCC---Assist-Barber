import UsuarioDAO from "../repositories/usuarioDAO.js";
const usuarioDAO = new UsuarioDAO();

const checarAtivo = async (req, res, next) => {
    try {
        const { email } = req.body;

        let usuario = await usuarioDAO.buscarPorEmail(email);

        if (usuario.ativo == false) {
            throw Error('Usuário não validado!');
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

const checarValidado = async (req, res, next) => {
    try {
        const { email } = req.body;

        let usuario = await usuarioDAO.buscarPorEmail(email);

        if (usuario.validado == false) {
            throw Error('Usuário não validado!');
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
export {
    checarValidado,
    checarAtivo
};