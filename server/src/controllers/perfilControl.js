import { Perfil } from '../models';
import { DOMAIN } from '../constants';

/**
 * @description Criar perfil de um usuario autenticado
 * @type POST <multipart-form> request
 * @api /perfis/api/criar-perfil
 * @access private
 */

export const criarPerfil = async (req, res) => {
    try {
        let { file, user } = req;
        let path = DOMAIN + file.path.split("uploads")[1];
        let perfil = new Perfil({
            conta: user._id,
            imagemPerfil: path,
        });
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

/**
 * @description Get perfil de um usuario autenticado
 * @api /perfis/api/meu-perfil
 * @access private
 * @type GET
 */
export const exibirPerfil = async (req, res) => {
    try {
        let perfil = await Perfil.findOne({ conta: req.user._id }).populate(
            "conta", "nome email telefone"
        );
        if (!perfil) {
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
}

/**
 * @description Editar o perfil de um usuario autenticado
 * @type PUT <multipart-form> request
 * @api /perfis/api/editar-perfil
 * @access private
 */

export const editarPerfil = async (req, res) => {
    try {
        let { file } = req;

        let path = DOMAIN + file.path.split("uploads")[1];

        let perfil = await Perfil.findOneAndUpdate(
            { conta: req.user._id },
            { imagemPerfil: path },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            msg: "Seu perfil foi editado.",
            perfil
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: "Não foi possível adiquirir o perfil."
        });
    }
}
