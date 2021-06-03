import { Servico, Usuario } from '../models';
import autorizarCRUD from '../functions/autenticacao-crud';
/**
 * @description Criar um servico pelo Barbeiro autenticado
 * @api /servicos/api/criar-servico
 * @access private
 * @type POST
 */
export const criarServico = async (req, res) => {
    try {
        //Criar novo servico
        let { body } = req;
        console.log(req.user);
        let servico = new Servico({
            ...body
        });
        await servico.save();
        return res.status(201).json({
            servico,
            success: true,
            msg: "Servico criado com sucesso."
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: "Incapaz de criar o servico."
        });
    }
}

/**
 * @description Editar um servico do Barbeiro autenticado
 * @api /servicos/api/editar-servico/:id
 * @access private
 * @type PUT
 */
export const editarServico = async (req, res) => {
    try {
        let { id } = req.params;
        let { user, body } = req;
        //Checar se o servico existe no banco de dados;
        let servico = await Servico.findById(id);
        autorizarCRUD(servico.usuarioId.toString(), user._id.toString());
        servico = await Servico.findOneAndUpdate(
            { usuarioId: user._id, _id: id },
            { ...body },
            { new: true }
        );
        return res.status(201).json({
            servico,
            success: true,
            msg: "Servico editado com sucesso."
        });
    } catch (err) {
        return res.status(400).json({
            err,
            success: false,
            msg: "Incapaz de atualizar servico."
        });
    }
}

/**
 * @description Excluir um servico do Barbeiro autenticado
 * @api /servicos/api/ecluir-servico/:id
 * @access private
 * @type DELETE
 */
export const excluirServico = async (req, res) => {
    try {
        let { id } = req.params;
        let { user } = req;
        let servico = await Servico.findById(id);
        autorizarCRUD(servico.usuarioId.toString(), user._id.toString());
        servico = await Servico.findOneAndDelete(
            { usuarioId: user._id, _id: id });
        return res.status(201).json({
            servico,
            success: true,
            msg: "Servico deletado com sucesso."
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err,
            success: false,
            msg: "Incapaz de deletar servico."
        });
    }
}

/**
 * @description Listar servicos do Barbeiro
 * @api /servicos/api/listar-servicos
 * @access private
 * @type GET
 */

export const listarServicos = (req, res) => {
    try {
        Servico.find({}, function (err, servicos) {
            if (err) return next(err);
            res.json({ servicos });
        });
    } catch (err) {
        return res.status(400).json({
            err,
            success: false,
            msg: "Incapaz de listar servicos."
        });
    }
}