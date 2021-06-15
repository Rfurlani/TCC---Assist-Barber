import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';
import { uploadImgPerfil } from '../middlewares/uploader';

import ClienteController from '../controllers/cliente-controller'

class ClienteRouter {
    constructor() {
        this.router = Router();
        this.clienteController = new ClienteController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {

        this.router.get('/get-cliente',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.clienteController
                .exibirCliente.bind(this.clienteController));

        this.router.patch('/:idCliente/alterar-cliente',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            uploadImgPerfil.single('imagemPerfil'),
            this.clienteController
                .alterarCliente.bind(this.clienteController));


        this.router.get('/protegidaCli',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            (req, res) => {
                try {
                    return res.json({ msg: "Entrou Cliente!" })
                } catch (err) {
                    return res.json({ err })
                }
            });
    }
}

export default new ClienteRouter().router;