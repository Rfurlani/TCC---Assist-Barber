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

        //CADASTRO E AUTENTICAÇÃO
        this.router.post('/cadastrar-barbeiro',
            //uploadCertificado.single('certificado'),
            this.barbeiroController
                .cadastrar.bind(this.barbeiroController));

        this.router.post('/autenticar-barbeiro',
            this.barbeiroController
                .autenticar.bind(this.barbeiroController));

        this.router.get('/get-barbeiro',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.barbeiroController
                .exibirBarbeiro.bind(this.barbeiroController));

        //INFORMAÇÕES DE CADASTRO E PERFIL
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

        //SERVIÇOS
        this.router.post('/:idBarbeiro/criar-servico',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.barbeiroController
                .inserirServico.bind(this.barbeiroController));

        this.router.get('/:idBarbeiro/listar-servicos',
            this.usuarioAuth,
            this.validator,
            this.barbeiroController
                .listarServicos.bind(this.barbeiroController));

        this.router.delete('/:idBarbeiro/excluir-servico/:id',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.barbeiroController
                .excluirServico.bind(this.barbeiroController));

        this.router.patch('/:idBarbeiro/alterar-servico/:id',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.barbeiroController
                .alterarServico.bind(this.barbeiroController));

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