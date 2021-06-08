import ClienteDAO from '../repositories/clienteDAO';
import { genSaltSync, hashSync } from 'bcryptjs';
import ManageJWT from '../utils/ManageJWT';
import { maxAge } from '../constants';
import ValidacaoUsuario from '../validators/validacao-usuario';

class ClienteController {

    constructor() {

        this.clienteDAO = new ClienteDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.manageJWT = new ManageJWT();
    }

    /**
     * @description Cria uma nova conta de usuario para cliente
     * @api /auth/cadastrar-cliente
     * @access public
     * @type POST
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            let cliente = await this.clienteDAO.buscarPorEmail(email);

            this.validacaoUsuario.checarEmailCadastro(cliente);

            cliente = req.body;

            var salt = genSaltSync(10);

            cliente.senha = hashSync(cliente.senha, salt);

            cliente = await this.clienteDAO.salvar(cliente);

            return res.status(201).json({
                    success: true,
                    msg: "Contra criada! Verifique seu email para confirmação!"
                });

        } catch (err) {

            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });

        }

    }

    /**
     * @description Autentica um cliente e envia o token de autenticacao
     * @api /auth/autenticar-cliente
     * @access public
     * @type POST
     */

    async autenticar(req, res){

        try {
            
            let { email, senha } = req.body;

            let cliente = await this.clienteDAO.buscarPorEmailComSenha(email);

            this.validacaoUsuario.checarEmailAutenticacao(cliente);

            this.validacaoUsuario.compararSenha(senha, cliente.senha);

            const payload = { id: cliente._id };   

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
     * @api /auth/deslogar-cliente
     * @access private
     * @type GET
     */

    deslogar(req, res) {

            return res.cookie('jwt', '',{
                maxAge: 1
            }).status(200).json({
                success: true,
                msg: "Você deslogou!"
            })

    }
}

export default ClienteController;
