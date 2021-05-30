import { Router } from 'express';
import { Perfil } from '../models';
import { DOMAIN } from '../constants';
import uploader from '../middlewares/uploader';
import { usuarioAuth } from '../middlewares/auth-guard';
import consolaGlobalInstance from 'consola';

const router = Router();

/**
 * @description Criar perfil de um usuario autenticado
 * @type POST <multipart-form> request
 * @api /perfis/api/criar-perfil
 * @access Private
 */

router.post(
    '/api/criar-perfil',
    usuarioAuth,
    uploader.single("imagemPerfil"),
    async(req, res) => {
        try {
            let { file, user } = req;
            let path = DOMAIN + file.path.split("uploads")[1];
            let perfil = new Perfil({
                conta: user._id,
                imagemPerfil: path,
            });
            console.log("PERFIL_USUARIO", perfil);
            await perfil.save();
            return res.status(201).json({
                sucess: true,
                msg: "Perfil criado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                msg: "Não foi possível criar o perfil."
            });
        }
    }
);

/**
 * @description Get perfil de um usuario autenticado
 * @type GET <multipart-form> request
 * @api /perfis/api/meu-perfil
 * @access Private
 */
router.get('/api/meu-perfil', usuarioAuth, async(req, res) => {
    try {
        let perfil = await Perfil.findOne({ conta: req.user._id }).populate(
            "conta", "nome email telefone"
        );
        if(!perfil){
            return res.status(404).json({
                success: false,
                msg: "Perfil não está disponível."
            });
        }
        return res.status(200).json({
            success: true,
            perfil
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: "Não foi possível adiquirir o perfil."
        });
    }
});

export default router;