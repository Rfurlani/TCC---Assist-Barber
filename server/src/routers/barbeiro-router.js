import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import validarCargos from '../middlewares/validar-cargos.js';
import Validator from '../middlewares/validator-middleware.js';
import { uploadImgPerfil, uploadCertificado } from '../middlewares/uploader';
import checarServico from '../middlewares/checar-servico.js';

import BarbeiroController from '../controllers/barbeiro-controller.js';

class BarbeiroRouter {
    constructor() {
        this.router = Router();
        this.barbeiroController = new BarbeiroController();
        this.usuarioAuth = usuarioAuth;
        this.checarServico = checarServico;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
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
            this.barbeiroController
                .alterarBarbeiro.bind(this.barbeiroController));

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
            this.checarServico,
            this.barbeiroController
                .excluirServico.bind(this.barbeiroController));

        this.router.patch('/:idBarbeiro/alterar-servico/:id',
            this.usuarioAuth,
            this.validator,
            this.validarCargos('barbeiro'),
            this.checarServico,
            this.barbeiroController
                .alterarServico.bind(this.barbeiroController));

        //GeoPos
        this.router.post('/:idBarbeiro/inserir-geo-pos',
            this.usuarioAuth,
            this.validator,
            this.barbeiroController
                .inserirGeoPos.bind(this.barbeiroController));

        //Buscar GeoPos
        this.router.get('/geoPos/listar-proximos',
            this.usuarioAuth,
            this.validator,
            this.barbeiroController
                .listarBarbeirosProximos.bind(this.barbeiroController));

        //Atualizar GeoPos
        this.router.patch('/geoPos/:barbeiroId',
            this.usuarioAuth,
            this.validator,
            this.barbeiroController
                .atualizarLocalizacao.bind(this.barbeiroController));

        //Buscar Avaliações
        this.router.get('/:idBarbeiro/avaliacoes',
            this.usuarioAuth,
            this.validator,
            this.barbeiroController
                .buscarAvaliacoes.bind(this.barbeiroController));

    }
}

export default new BarbeiroRouter().router;