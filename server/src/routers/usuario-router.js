import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import Validator from '../middlewares/validator-middleware.js';
import { uploadImgPerfil } from '../middlewares/uploader';

import UsuarioController from '../controllers/usuario-controller.js';

class UsuarioRouter {
    constructor() {
        this.router = Router();
        this.usuarioController = new UsuarioController();
        this.usuarioAuth = usuarioAuth;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.post('/cadastrar-usuario',
            this.usuarioController
                .cadastrar
                .bind(this.usuarioController));

        this.router.post('/autenticar-usuario',
            this.usuarioController
                .autenticar.bind(this.usuarioController));

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