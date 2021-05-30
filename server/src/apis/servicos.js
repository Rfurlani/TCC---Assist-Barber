import { Router } from 'express';
import { Servico, Usuario } from '../models';
import { usuarioAuth } from '../middlewares/auth-guard';
import Validator from '../middlewares/validator-middleware';
import { ValidacaoServico } from '../validators/servico-validators';

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
    ValidacaoServico,
    async (req, res) =>{
    try {
        //Criar novo servico
        let {body} = req;
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
router.put (
    "/api/editar-servico/:id", 
    usuarioAuth, 
    Validator,
    ValidacaoServico,
    async (req, res) =>{
        try {
            let { id } = req.params;
            let { user, body } = req;
            //Checar se o servico existe no banco de dados;
            let servico = await Servico.findById(id);
            if(servico.usuarioId.toString() !== user._id.toString()){
                console.log(servico.usuarioId.toString(), user._id.toString());
                return res.status(401).json({
                    success: false,
                    message: "Alteração não autorizada."
                });
            }
            servico = await Servico.findOneAndUpdate(
                { usuarioId: user._id, _id: id },
                { ...body},
                { new: true}
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

/*router.delete (

)*/

export default router;