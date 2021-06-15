import Usuario from '../domains/usuario-domain.js';
import UsuarioDAO from '../repositories/usuarioDAO.js';
import { encriptar } from '../utils/bcrypt-functions.js';
import ManageJWT from '../utils/ManageJWT.js';
import ValidacaoUsuario from '../validators/validacao-usuario.js';
import BarbeiroController from './barbeiro-controller.js';
import ClienteController from './cliente-controller.js';

class UsuarioController {
    constructor() {
        this.manageJWT = new ManageJWT();
        this.usuarioDAO = new UsuarioDAO();
        this.validacaoUsuario = new ValidacaoUsuario();
        this.clienteController = new ClienteController();
        this.barbeiroController = new BarbeiroController();
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
                    throw Error('Cargo Inválido!')
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

            let perfil;

            switch (usuario.cargo) {
                case 'cliente':
                    perfil = await this.clienteController.buscarPorUsuarioId(usuario._id);
                    break;
                
                case 'barbeiro':
                    perfil = await this.barbeiroController.buscarPorUsuarioId(usuario._id);
                    break;
            
                default:
                    throw Error('Cargo inválido!')
            }

            usuario = {
                id: usuario.id,
                nome: usuario.nome,
                cargo: usuario.cargo,
                perfil
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
}

export default UsuarioController;