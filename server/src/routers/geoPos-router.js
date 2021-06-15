import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard.js';
import Validator from '../middlewares/validator-middleware.js';

import GeoPosController from '../controllers/geoPos-controller.js';

class GeoPosRouter{

    constructor(){
        this.router = Router();
        this.geoPosController = new GeoPosController()
        this.usuarioAuth = usuarioAuth;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes(){
        //Inserir GeoPos
        this.router.post('/:idBarbeiro/inserir-geo-pos',
            this.usuarioAuth,
            this.validator,
            this.geoPosController
                .inserirGeoPos.bind(this.geoPosController));

        //Buscar GeoPos
        this.router.get('/barbeiros',
            this.usuarioAuth,
            this.validator,
            this.geoPosController
                .buscarBarbeirosProximos.bind(this.geoPosController));

        //Atualizar GeoPos
        this.router.patch('/:id',
            this.usuarioAuth,
            this.validator,
            this.geoPosController
                .atualizarLocalizacao.bind(this.geoPosController));
    }

}

export default new GeoPosRouter().router;