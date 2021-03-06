import { DOMAIN, REQ_PORT, HOST_EMAIL } from '../constants/index.js';
import Usuario from '../domains/usuario-domain.js';
import UsuarioDAO from '../repositories/usuarioDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import ManageJWT from '../utils/ManageJWT.js';
import GeoPosController from './geoPos-controller.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import AgendaBarbeiroController from './agenda-barbeiro-controller.js';
import AgendaClienteController from './agenda-cliente-controller.js';
import autorizarOperacao from "../utils/autorizar-operacao.js";
import AdminController from './admin-controller.js';
import BarbeiroController from './barbeiro-controller.js';
import ClienteController from './cliente-controller.js';
import NotificacaoController from './notificacao-controller.js';
import GerenciadorEmails from './gerenciadorEmails.js';
import { randomBytes } from 'crypto';

class UsuarioController {
    constructor() {
        this.manageJWT = new ManageJWT();
        this.usuarioDAO = new UsuarioDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.adminController = new AdminController();
        this.clienteController = new ClienteController();
        this.barbeiroController = new BarbeiroController();
        this.agendaBarbeiroController = new AgendaBarbeiroController();
        this.agendaClienteController = new AgendaClienteController();
        this.notificacaoController = new NotificacaoController();
        this.gerenciadorEmails = new GerenciadorEmails();
        this.geoPosController = new GeoPosController();
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

            let assunto, info;

            this.validacaoUsuario.checarEmailCadastro(usuario);

            usuario = new Usuario(
                req.body.email,
                req.body.nome,
                req.body.senha,
                req.body.telefone,
                false,//Trocar com validar email
                null,//imgPerfil
                req.body.cargo,
                {},
                randomBytes(20).toString('hex'),
                null//agenda
            );
            
            usuario.senha = encriptar(usuario.senha);

            switch (usuario.cargo) {
                
                case 'cliente':
                    
                    usuario = await this.usuarioDAO.salvar(usuario);

                    let cliente = {
                        usuarioId: usuario._id,
                        endereco: req.body.endereco
                    };

                    cliente = await this.clienteController.criarCliente(cliente);

                    assunto = 'Confirmar Email';

                    info = `
                    Ol??, ${usuario.nome}!
                    Clique no link a seguir para confirmar seu email no assist barber.

                    ${REQ_PORT}/usuario/validar-email/${usuario.codigoVerificacao}

                    Caso n??o fez requerimento para tal, ignore o email.
                    `
                    this.gerenciadorEmails.criarEmail(email, assunto, info);

                    return res.status(201).json({
                        cliente,
                        success: true,
                        msg: "Conta criada! Verifique seu email para confirma????o!"
                    });

                case 'barbeiro':
                    //agenda = await this.agendaBarbeiroController.criarAgenda(usuario._id);//Mover para ap??s validar

                    //usuario.agenda = agenda._id;
                    usuario = await this.usuarioDAO.salvar(usuario);

                    let barbeiro = {
                        usuarioId: usuario._id,
                        cpf: req.body.cpf,
                        //path certificado
                    }

                    barbeiro = await this.barbeiroController.criarBarbeiro(barbeiro);
                    //Enviar email

                    assunto = 'Conta sobre averigua????o';

                    info = `
                    Ol??, ${usuario.nome}!
                    Sua conta est?? sob an??lise. Um email ser?? enviado a voc?? com o resultado ap??s esta an??lise for terminada, com o resultado se voc?? atendeu as requerimentos do AssistBarber.
                    `
                    this.gerenciadorEmails.criarEmail(email, assunto, info);

                    return res.status(201).json({
                        barbeiro,
                        success: true,
                        msg: "Conta sobre averigua????o. Confira seu email para mais informa????es."
                    });

                case 'admin':
                    usuario.validado = true; //Ajustar
                    usuario = await this.usuarioDAO.salvar(usuario);

                    let admin = {
                        usuarioId: usuario._id
                    }

                    admin = await this.adminController.criarAdmin(admin);
                    
                    return res.status(201).json({
                        admin,
                        success: true,
                        msg: "Conta administrador criada."
                    });
                default:
                    throw new Error('Cargo Inv??lido!')
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });

        }

    }
    /**
     * @description Validar Cliente
     * @api /usuario/validar-usuario/:codigoVerificacao
     * @access public
     * @type GET
     */
     async validarCliente(req, res) {
        try {
            let { codigoVerificacao } = req.params;

            let usuario = await this.usuarioDAO.buscarCodVerificacao(codigoVerificacao);

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    msg: 'C??digo de Verifica????o inv??lido!'
                })
            }

            usuario.validado = true;
            usuario.codigoVerificacao = undefined;

            let agenda = await this.agendaClienteController.criarAgenda(usuario._id);

            usuario.agenda = agenda._id;
            console.log(agenda, usuario)
            usuario = await this.usuarioDAO.atualizarUsuario(usuario._id, usuario);

            return res.status(200).json({
                success: true,
                msg: 'C??digo v??lido! Usu??rio validado!'
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                err,
                msg: 'Erro ao validar usu??rio!'
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
                token,
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
     * @description Exibe barbeiros n??o validados
     * @api /usuario/admin/exibir-usuarios
     * @type GET
     */
    async exibirUsuarios (req, res){
        try {
            let usuarios = await this.usuarioDAO.buscarTodos();

            return res.status(201).json({
                success: true,
                usuarios,
                msg: "Listando usuarios!"
            });
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                success: false,
                msg: "Usuarios n??o encontrados.",
                err
            });
        }
    }

    /**
     * @description Exibe barbeiros n??o validados
     * @api /usuario/admin/exibir-barbeiros-validacao
     * @type GET
     */

    async exibirBarbeirosValidacao (req, res){
        try {
            let barbeiros = await this.usuarioDAO.buscarBarbeirosNaoValidados();

            return res.status(201).json({
                success: true,
                barbeiros,
                msg: "Listando usuarios!"
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
     * @description Exibe barbeiros n??o validados
     * @api /usuario/admin/gerenciar-validacao/:usuarioId
     * @access private
     * @type PATCH
     */

     async gerenciarValidacao (req, res){
        try {
            const { usuarioId } = req.params;

            let { body } = req;

            let usuario = await this.usuarioDAO.buscarPorID(usuarioId);

            let agenda = await this.agendaBarbeiroController.criarAgenda(usuarioId);

            usuario.agenda = agenda._id;
            usuario.validado = body.validado;
            
            usuario = await this.usuarioDAO.atualizarUsuario(usuarioId, usuario);

            if(!usuario){
                throw Error('Usuario n??o existe!')
            }

            let assunto, info;
            
            if(usuario.validado == true && usuario.ativo== true){
                assunto = 'Conta aprovada!';

                info = `
                Ol??, ${usuario.nome}!
                Sua conta foi aprovada!
                V?? at?? ao nosso WebApp em:
                ${REQ_PORT}
                E logue em sua conta para come??ar a usar nossos servi??os!
                `
            } else if(usuario.ativo == false){
                assunto = 'Conta reprovada!';

                info = `
                Ol??, ${usuario.nome}.
                Sua conta foi reprovada por n??o atender aos nosso requisitos.
                Entre em contato com o email ${HOST_EMAIL} para mais informa????es.
                `
            }
            this.gerenciadorEmails.criarEmail(usuario.email, assunto, info);

            return res.status(201).json({
                success: true,
                usuario,
                agenda,
                msg: "Usuario alterado!"
            });
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Um erro ocorreu.",
                err
            });
        }
    }

    /**
     * @description Desativar usu??rio
     * @api /usuario/admin/gerenciar-usuario/:usuarioId
     * @access private
     * @type PATCH
     */
    async gerenciarUsuario (req, res){
        try {
            const { usuarioId } = req.params;
            const { body } = req;

            let usuario = await this.usuarioDAO.atualizarUsuario(usuarioId, body);

            if(usuario === null){
                throw new Error('Usu??rio inexistente!')
            }

            let assunto, info;

            if(usuario.ativo == false){

                assunto = 'Conta desativada!';

                info = `
                Ol??, ${usuario.nome}.
                Sua conta foi desativada por infringir nosssos termos de uso.
                Entre em contato com o email ${HOST_EMAIL} para mais informa????es.`

                this.gerenciadorEmails.criarEmail(usuario.email, assunto, info);
                
            }

            return res.status(201).json({
                success: true,
                usuario,
                msg: "Usuario alterado!"
            });

        } catch (err) {
            console.log(err)
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
                msg: 'Notifica????o vista!'
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
                msg: "Notifica????o exclu??da com sucesso.",
                notificacao
            });

        } catch (err) {
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de excluir notifica????o."
            });
        }
    }

    /**
     * @description Atualizar Usu??rio Barbeiro
     * @api /usuario/:idUsuario/atualizar-barbeiro
     * @access private
     * @type PATCH <multipart-form> request
     */

    async atualizarUsuarioBarbeiro(req, res) {
        try {
            let { idUsuario } = req.params;

            let { user, body, file } = req;

            let usuario;

            autorizarOperacao(idUsuario.toString(), user._id.toString());

            if (file != undefined) {
                let path = DOMAIN + file.path.split("uploads")[1];

                usuario = await this.usuarioDAO.atualizarUsuario(idUsuario, body, path);
            } else {
                usuario = await this.usuarioDAO.atualizarUsuario(idUsuario, body);
            }

            let barbeiro = await this.barbeiroController.alterarBarbeiro(idUsuario, body);

            if (!barbeiro._id) {
                throw Error(barbeiro);
            }

            return res.status(200).json({
                usuario,
                barbeiro,
                success: true,
                msg: "Usuario atualizado com sucesso.",
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar usuario.",
            });
        }
    }

    /**
    * @description Atualizar Usu??rio Cliente
    * @api /usuario/:idUsuario/atualizar-cliente
    * @access private
    * @type PATCH <multipart-form> request
    */

    async atualizarUsuarioCliente(req, res) {
        try {
            let { idUsuario } = req.params;

            let { user, body, file } = req;

            let usuario;

            autorizarOperacao(idUsuario.toString(), user._id.toString());

            if (file != undefined) {
                let path = DOMAIN + file.path.split("uploads")[1];

                usuario = await this.usuarioDAO.atualizarUsuario(idUsuario, body, path);
            } else {
                usuario = await this.usuarioDAO.atualizarUsuario(idUsuario, body);
            }

            let cliente = await this.clienteController.alterarCliente(idUsuario, body);

            if (!cliente._id) {
                throw Error(cliente);
            }

            return res.status(200).json({
                usuario,
                cliente,
                success: true,
                msg: "Usuario atualizado com sucesso.",
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de atualizar usuario.",
            });
        }
    }

    /**
     * @description Inicia processo de resett de password
     * @api /usuario/redefinir-senha
     * @access private
     * @type PATCH
    */

    async PedidoRedefinirSenha(req, res) {
        try {
            let { email } = req.body;

            let usuario = await this.usuarioDAO.buscarPorEmail(email);

            this.validacaoUsuario.checarEmailSistema(email);

            usuario.redefinirSenhaToken = randomBytes(20).toString('hex');

            let token = usuario.redefinirSenhaToken;

            usuario.redefinirSenhaExpiracao = Date.now() + 36000000

            usuario = await this.usuarioDAO.atualizarUsuario(usuario._id, usuario);

            let assunto = 'Redefenir Senha';

            let info = `
            Ol??, ${usuario.nome}!
            Clique no link a seguir para redefenir sua senha.

            ${REQ_PORT}/usuario/redefinir-senha/${token}

            Caso n??o fez requerimento para tal, ignore o email.
            `
            this.gerenciadorEmails.criarEmail(email, assunto, info);

            return res.status(200).json({
                success: true,
                msg: 'Email com token enviado com sucesso!'
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                err,
                success: false,
                msg: "Incapaz de gerar token de reset de senha",
            });
        }
    }

    /**
     * @description Verifica se usu??rio possui token de reset de senha e atualiza a senha
     * @api /usuario/redefinir-senha/:redefinirSenhaToken
     * @access private
     * @type PATCH
     */
    async RedefinirSenha(req, res) {
        try {
            let { redefinirSenhaToken } = req.params;
            let { senha } = req.body;

            let usuario = await this.usuarioDAO.buscarPorTokenSenha(redefinirSenhaToken);

            if (!usuario) {
                return res.status(401).json({
                    success: false,
                    msg: 'Token de redefinir senha ?? inv??lido ou expirou!'
                })
            }

            senha = encriptar(senha);
            usuario.senha = senha;
            usuario.redefinirSenhaToken = undefined;
            usuario.redefinirSenhaExpiracao = undefined;

            usuario = await this.usuarioDAO.atualizarUsuario(usuario._id, usuario);

            return res.status(200).json({
                success: true,
                msg: 'Token v??lido!'
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                err,
                msg: 'Erro ao validar token senha!'
            })
        }
    }

}

export default UsuarioController;