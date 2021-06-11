import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';
import { uploadImgPerfil, uploadCertificado } from '../middlewares/uploader';

import BarbeiroController from '../controllers/barbeiro-controller.js';

class BarbeiroRouter {
    constructor() {
        this.router = Router();
        this.barbeiroController = new BarbeiroController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {

        this.router.post('/cadastrar-barbeiro',
            uploadCertificado.single('certificado'),
            this.barbeiroController
                .cadastrar.bind(this.barbeiroController));

        this.router.post('/autenticar-barbeiro',
            this.barbeiroController
                .autenticar.bind(this.barbeiroController));

        this.router.get('/deslogar-barbeiro',
            this.barbeiroController
                .deslogar.bind(this.barbeiroController));

        this.router.get('/get-barbeiro',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.barbeiroController
                .exibirBarbeiro.bind(this.barbeiroController));

        this.router.get('/get-barbeiro/:idBarbeiro',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('cliente'),
            this.barbeiroController
                .exibirBarbeiroInfo.bind(this.barbeiroController));

        this.router.patch('/:idBarbeiro/alterar-barbeiro',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            uploadCertificado.single('certificado'),
            this.barbeiroController
                .alterarBarbeiro.bind(this.barbeiroController));


        this.router.patch('/:idBarbeiro/alterar-barbeiro/imagemPerfil',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            uploadImgPerfil.single('imagemPerfil'),
            this.barbeiroController
                .alterarBarbeiroImg.bind(this.barbeiroController));

        this.router.get('/protegidaBarb',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            (req, res) => {
                try {
                    return res.json({ msg: "Entrou Barbeiro!" })
                } catch (err) {
                    return res.json({ err })
                }
            })


    }
}

export default new BarbeiroRouter().router;