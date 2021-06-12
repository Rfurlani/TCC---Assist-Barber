import ClienteDAO from "../repositories/clienteDAO.js";
import BarbeiroDAO from "../repositories/barbeiroDAO.js";
import ValidacaoUsuario from "../validators/validacao-usuario.js";
import ManageJWT from '../utils/ManageJWT.js';
import { maxAge } from '../constants';

class AuthController {

    constructor() {
        this.manageJWT = new ManageJWT();
        this.clienteDAO = new ClienteDAO();
        this.barbeiroDAO = new BarbeiroDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
    }

    /**
     * @description Autentica um cliente e envia o token de autenticacao
     * @api /auth/autenticar-usuario
     * @access public
     * @type POST
     */

     async autenticar(req, res) {

        try {

            let { email, senha } = req.body;

            let usuario = await this.clienteDAO.buscarPorEmailComSenha(email) || await this.barbeiroDAO.buscarPorEmailComSenha(email);

            this.validacaoUsuario.checarEmailAutenticacao(usuario);

            this.validacaoUsuario.compararSenha(senha, usuario.senha);

            const payload = { id: usuario._id };

            let token = this.manageJWT.gerarJWT(payload);

            return res.cookie('jwt',
                token, {
                httpOnly: true,
                secure: false,//trocar em producao
                maxAge: maxAge
            })
                .status(201).json({
                    success: true,
                    msg: "Autenticado! Logando!"
                });


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });

        }

    }

    /**
     * @description Desloga cliente autenticado
     * @api /auth/logout-usuario
     * @access private
     * @type GET
     */

    deslogar(req, res) {

        return res.cookie('jwt', '', {
            maxAge: 1
        }).status(200).json({
            success: true,
            msg: "Você deslogou!"
        })

    }

}

export default AuthController;