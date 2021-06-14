import { DOMAIN, maxAge } from '../constants';
import ManageJWT from '../utils/ManageJWT.js';
import Cliente from '../domains/cliente-domain.js';
import ClienteDAO from '../repositories/clienteDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import autorizarOperacao from '../utils/autorizar-operacao.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';

class ClienteController {

    constructor() {
        this.clienteDAO = new ClienteDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.manageJWT = new ManageJWT();
    }

    /**
     * @description Cria uma nova conta de usuario para cliente
     * @api /cliente/cadastrar-cliente
     * @access public
     * @type POST
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            let cliente = await this.clienteDAO.buscarPorEmail(email);

            this.validacaoUsuario.checarEmailCadastro(cliente);

            cliente = new Cliente(
                req.body.email,
                req.body.nome,
                req.body.senha,
                req.body.telefone,
                true,      //Alterar com verificação por email
                req.body.endereco,
                null,
                'cliente',
                []
            );

            cliente.senha = encriptar(cliente.senha);

            cliente = await this.clienteDAO.salvar(cliente);

            return res.status(201).json({
                success: true,
                msg: "Conta criada! Verifique seu email para confirmação!"
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
     * @api /cliente/autenticar-cliente
     * @access public
     * @type POST
     */

     async autenticar(req, res) {

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
     * @description Pega informações do cliente autenticado
     * @api /cliente/get-cliente
     * @access private
     * @type GET
     */

    async exibirCliente(req, res) {

        try {
            const user = req.user;

            let cliente = await this.clienteDAO.buscarPorID(user._id);

            return res.status(200).json({
                cliente,
                msg: "Cliente pego com sucesso!"
            })
        } catch (err) {

            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }

    }

    /**
     * @description Alterar cliente autenticado
     * @api /cliente/:idCliente/alterar-cliente
     * @access private
     * @type PATCH
     */

     async alterarCliente (req, res) {
        try {
            let { idCliente } = req.params;

            let { user, body, file } = req;

            let path = DOMAIN + file.path.split("uploads")[1];

            autorizarOperacao(idCliente.toString(), user._id.toString());

            let cliente = await this.clienteDAO.atualizarCliente(idCliente, body, path);
            
            return res.status(200).json({
                cliente,
                success: true,
                msg: "Cliente atualizado com sucesso.",
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar cliente."
            });
        }
    }

    


}

export default ClienteController;
