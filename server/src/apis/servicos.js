import { Router } from 'express';
import { Servico, Usuario } from '../models';
import { usuarioAuth } from '../middlewares/auth-guard';
import Validator from '../middlewares/validator-middleware';
import autorizarCRUD from '../functions/autenticacao-crud';
import { ValidacaoServico } from '../validators/servico-validators';
import checarCargo from '../middlewares/checa-cargos';

const router = Router();
/**
 * @description Criar um servico pelo Barbeiro autenticado
 * @api /servicos/api/criar-servico
 * @access private
 * @type POST
 */
router.post(
    "/api/criar-servico",
    usuarioAuth,
    Validator,
    checarCargo(["Barbeiro"]),
    ValidacaoServico,
    async (req, res) => {
        try {
            //Criar novo servico
            let { body } = req;
            console.log(req.user);
            let servico = new Servico({
                usuarioId: req.user._id,
                ...body
            });
            await servico.save();
            return res.status(201).json({
                servico,
                success: true,
                message: "Servico criado com sucesso."
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Incapaz de criar o servico."
            });
        }
    });

/**
 * @description Editar um servico do Barbeiro autenticado
 * @api /servicos/api/editar-servico/:id
 * @access private
 * @type PUT
 */
router.put(
    "/api/editar-servico/:id",
    usuarioAuth,
    Validator,
    checarCargo(["Barbeiro"]),
    ValidacaoServico,
    async (req, res) => {
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
                message: "Servico editado com sucesso."
            });
        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                message: "Incapaz de atualizar servico."
            });
        }
    });

/**
 * @description Deletar um servico do Barbeiro autenticado
 * @api /servicos/api/deletar-servico/:id
 * @access private
 * @type DELETE
 */

router.delete(
    "/api/deletar-servico/:id",
    usuarioAuth,
    async (req, res) => {
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
                message: "Servico deletado com sucesso."
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                message: "Incapaz de deletar servico."
            });
        }
    });

/**
 * @description Listar servicos do Barbeiro
 * @api /servicos/api/listar-servicos
 * @access private
 * @type GET
 */
router.get('/api/listar-servicos', usuarioAuth, async (req, res) => {
    try {
        Servico.find({},function (err, servicos) {
            if (err) return next(err);
            res.json({servicos, algo});
        });
    } catch (err) {
        return res.status(400).json({
            err,
            success: false,
            message: "Incapaz de listar servicos."
        });
    }

});

export default router;