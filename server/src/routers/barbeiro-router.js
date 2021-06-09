import { Router } from 'express';

import { usuarioAuth } from '../middlewares/auth-guard';
import validarCargos from '../middlewares/validar-cargos';
import Validator from '../middlewares/validator-middleware';

import BarbeiroController from "../controllers/barbeiro-controller";

class BarbeiroRouter{
    constructor(){
        this.router = Router();
        this.barbeiroController = new BarbeiroController();
        this.usuarioAuth = usuarioAuth;
        this.validarCargos = validarCargos;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes(){

        this.router.post('/cadastrar-barbeiro',
            this.barbeiroController
                .cadastrar.bind(this.barbeiroController));

        this.router.post('/autenticar-barbeiro',
            this.barbeiroController
                .autenticar.bind(this.barbeiroController)
        )

        this.router.get('/deslogar-barbeiro',
            this.barbeiroController
                .deslogar.bind(this.barbeiroController)
        )

        this.router.get('/protegidaBarb', (req, res) =>{
            return res.json({msg:"Entrou Barbeiro!"})
        })

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