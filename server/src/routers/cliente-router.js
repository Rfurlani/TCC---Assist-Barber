import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard';
import validarCargos from '../middlewares/validar-cargos';
import Validator from '../middlewares/validator-middleware';

import ClienteController from "../controllers/cliente-controller";

class ClienteRouter {
    constructor() {
        this.router = Router();
        this.clienteController = new ClienteController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRouter() {

        this.router.post('/cadastrar-cliente',
            this.clienteController
                .cadastrar.bind(this.clienteController));

        this.router.post('/autenticar-cliente',
            this.clienteController
                .autenticar.bind(this.clienteController)
        )

        this.router.get('/deslogar-cliente',
            this.clienteController
                .deslogar.bind(this.clienteController)
        )

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
            })
    }
}

export default new ClienteRouter().router;