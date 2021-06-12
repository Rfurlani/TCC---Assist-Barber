import Barbeiro from '../domains/barbeiro-domain.js';
import BarbeiroDAO from '../repositories/barbeiroDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import { DOMAIN } from '../constants';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';

class BarbeiroController {

    constructor() {
        this.barbeiroDAO = new BarbeiroDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
    }

    /**
     * @description Criar uma nova conta de usuario para barbeiro
     * @type POST <multipart-form> request
     * @api /barbeiro/cadastrar-barbeiro
     * @access public
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            //let { file } = req;

            let barbeiro = await this.barbeiroDAO.buscarPorEmail(email);

            //let path = DOMAIN + file.path.split("uploads")[1];
            
            this.validacaoUsuario.checarEmailCadastro(barbeiro);
            
            barbeiro = new Barbeiro(
                req.body.email,
                req.body.nome,
                req.body.senha,
                req.body.telefone,
                true,        //Alterar com verificação por email
                req.body.cpf,
                [],
                null,
                null,
                null, //path certificado
                'barbeiro'
            );

            barbeiro.senha = encriptar(barbeiro.senha);
            
            barbeiro = await this.barbeiroDAO.salvar(barbeiro);

            return res.status(201).json({
                success: true,
                msg: "Conta sobre averiguação." +
                    " Confira seu email para mais informações."
            });

        } catch (err) {
            let errMsg = err.message;
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err,
                errMsg
            });

        }

    }

    /**
     * @description Pega informações do barbeiro autenticado
     * @api /barbeiro/get-barbeiro
     * @access private
     * @type GET
     */

    async exibirBarbeiro(req, res) {

        try {
            const user = req.user;

            let barbeiro = await this.barbeiroDAO.buscarPorID(user._id);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }

    /**
     * @description Pega informações do barbeiro escolhido
     * @api /barbeiro/get-barbeiro/:idBarbeiro
     * @access private
     * @type GET
     */

    async exibirBarbeiroInfo(req, res) {

        try {
            const { idBarbeiro } = req.params;

            let barbeiro = await this.barbeiroDAO.buscarPorID(idBarbeiro);

            return res.status(200).json({
                barbeiro,
                msg: "Barbeiro pego com sucesso!"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }
    /**
     * @description Alterar barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro
     * @access private
     * @type PATCH <multipart-form> request
     */

     async alterarBarbeiro (req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, body, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiro(idBarbeiro, body, path);
            
            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Barbeiro atualizado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar barbeiro."
            });
        }
    }

    /**
     * @description Alterar imagem de perfil de barbeiro autenticado
     * @api /barbeiro/:idBarbeiro/alterar-barbeiro/imagemPerfil
     * @access private
     * @type PATCH <multipart-form> request
     */

     async alterarBarbeiroImg (req, res) {
        try {
            let { idBarbeiro } = req.params;

            let { user, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idBarbeiro.toString(), user._id.toString());

            let barbeiro = await this.barbeiroDAO.atualizarBarbeiroImgPerfil(idBarbeiro, path);
            
            return res.status(200).json({
                barbeiro,
                success: true,
                msg: "Imagem perfil atualizada com sucesso."
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Imagem perfil atualizada com sucesso."
            });
        }
    }

}

export default BarbeiroController;
