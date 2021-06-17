import Usuario from '../domains/usuario-domain.js';
import UsuarioDAO from '../repositories/usuarioDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import ManageJWT from '../utils/ManageJWT.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import AgendaController from './agenda-controller.js';
import BarbeiroController from './barbeiro-controller.js';
import ClienteController from './cliente-controller.js';
import NotificacaoController from './notificacao-controller.js';

class UsuarioController {
    constructor() {
        this.manageJWT = new ManageJWT();
        this.usuarioDAO = new UsuarioDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.clienteController = new ClienteController();
        this.barbeiroController = new BarbeiroController();
        this.agendaController = new AgendaController();
        this.notificacaoController = new NotificacaoController();
    }

    /**
     * @description Cria uma nova conta de usuario
     * @api /usuario/cadastrar-usuario
     * @access public
     * @type POST
     */

    async cadastrar(req, res) {

        try {

            let { email } = req.body;

            let usuario = await this.usuarioDAO.buscarPorEmail(email);

            this.validacaoUsuario.checarEmailCadastro(usuario);

            usuario = new Usuario(
                req.body.email,
                req.body.nome,
                req.body.senha,
                req.body.telefone,
                true, //Trocar com validar email
                null,
                req.body.cargo,
                {},
                null
            );

            usuario.senha = encriptar(usuario.senha);

            switch (usuario.cargo) {
                case 'cliente':
                    usuario = await this.usuarioDAO.salvar(usuario);

                    let cliente = {
                        usuarioId: usuario._id,
                        endereco: req.body.endereco
                    };

                    this.clienteController.criarCliente(cliente);
                    //Enviar email
                    return res.status(201).json({
                        success: true,
                        msg: "Conta criada! Verifique seu email para confirmação!"
                    });

                case 'barbeiro':
                    usuario = await this.usuarioDAO.salvar(usuario);

                    let barbeiro = {
                        usuarioId: usuario._id,
                        cpf: req.body.cpf,
                        //path certificado
                    }

                    this.barbeiroController.criarBarbeiro(barbeiro);
                    //Enviar email
                    return res.status(201).json({
                        success: true,
                        msg: "Conta sobre averiguação. Confira seu email para mais informações."
                    });

                default:
                    throw new Error('Cargo Inválido!')
            }
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
     * @description Autentica um usuario e envia o token de autenticacao
     * @api /usuario/autenticar-usuario
     * @access public
     * @type POST
     */

    async autenticar(req, res) {

        try {

            let { email, senha } = req.body;

            let usuario = await this.usuarioDAO.buscarPorEmailComSenha(email);

            this.validacaoUsuario.checarEmailAutenticacao(usuario);

            this.validacaoUsuario.compararSenha(senha, usuario.senha);

            let token = { id: usuario._id };

            token = this.manageJWT.gerarJWT(token);

            usuario = {
                id: usuario.id,
                nome: usuario.nome,
                cargo: usuario.cargo,
            }

            return res.status(201).json({
                success: true,
                token: `Bearer ${token}`,
                usuario,
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
     * @description Visualiza notificacao e marca ela como vista
     * @api /usuario/notificacao/:id/marcar-vista
     * @access public
     * @type GET
     */

    visualizarNotificacao(req, res) {
        try {
            const { id } = req.params;

            const { user } = req;

            this.notificacaoController.marcarComoVista(user._id, id);

            return res.status(200).json({
                success: true,
                msg: 'Notificação vista!'
            });
            
        } catch (err) {

            return res.status(500).json({
                success: false,
                msg: 'Erro!'
            });

        }
    }

    /**
     * @description Deletar notificacao
     * @api /usuario/notificacao/:id/excluir
     * @access public
     * @type DELETE
     */

    async excluirNotificacao(req, res) {
        try {
            const { id } = req.params;

            const { user } = req;

            let notificacao = await this.notificacaoController.excluirNotificacao(user._id, id);

            return res.status(200).json({
                success: true,
                msg: "Notificação excluída com sucesso.",
                notificacao
            });

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de excluir notificação."
            });
        }
    }
}

export default UsuarioController;