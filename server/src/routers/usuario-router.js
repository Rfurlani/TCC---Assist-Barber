import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import Validator from '../middlewares/validator-middleware.js';
import { checarAtivo, checarValidado } from '../middlewares/middelware-usuario.js';
import validarCargos from '../middlewares/validar-cargos.js';
import { uploadImgPerfil } from '../middlewares/uploader';

import UsuarioController from '../controllers/usuario-controller.js';

class UsuarioRouter {
    constructor() {
        this.router = Router();
        this.checarAtivo = checarAtivo,
        this.checarValidado = checarValidado,
        this.usuarioController = new UsuarioController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        //Auth
        this.router.post('/cadastrar-usuario',
            this.usuarioController
                .cadastrar
                .bind(this.usuarioController));

        this.router.post('/autenticar-usuario',
            this.checarAtivo,
            this.checarValidado,
            this.usuarioController
                .autenticar.bind(this.usuarioController));

        this.router.get('/validar-usuario/:codigoVerificacao',
            this.usuarioController
                .validarCliente.bind(this.usuarioController));

        //Admin
        this.router.get('/admin/exibir-usuarios',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.usuarioController
                .exibirUsuarios.bind(this.usuarioController));

        this.router.get('/admin/exibir-barbeiros-validacao',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.usuarioController
                .exibirBarbeirosValidacao.bind(this.usuarioController));

        this.router.patch('/admin/gerenciar-validacao/:usuarioId',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.usuarioController
                .gerenciarValidacao.bind(this.usuarioController));

        this.router.patch('/admin/gerenciar-usuario/:usuarioId',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('admin'),
            this.usuarioController
                .gerenciarUsuario.bind(this.usuarioController));

        //Atualizar Info Perfil
        this.router.patch('/:idUsuario/atualizar-barbeiro',
            this.usuarioAuth,
            this.validator,
            uploadImgPerfil.single('imagemPerfil'),
            this.usuarioController
                .atualizarUsuarioBarbeiro.bind(this.usuarioController));

        this.router.patch('/:idUsuario/atualizar-cliente',
            this.usuarioAuth,
            this.validator,
            uploadImgPerfil.single('imagemPerfil'),
            this.usuarioController
                .atualizarUsuarioCliente.bind(this.usuarioController));

        //Redefinir Senha
        this.router.patch('/redefinir-senha',
            this.usuarioController
                .PedidoRedefinirSenha.bind(this.usuarioController));

        this.router.patch('/redefinir-senha/:redefinirSenhaToken',
            this.usuarioController
                .RedefinirSenha.bind(this.usuarioController));

        //Notificações
        this.router.get('/notificacao/:id/marcar-vista',
            this.usuarioAuth,
            this.validator,
            this.usuarioController
                .visualizarNotificacao.bind(this.usuarioController));

        this.router.delete('/notificacao/:id/excluir',
            this.usuarioAuth,
            this.validator,
            this.usuarioController
                .excluirNotificacao.bind(this.usuarioController));
    }
}

export default new UsuarioRouter().router;