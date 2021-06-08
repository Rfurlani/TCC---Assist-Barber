import { Router } from 'express';

import ClienteController from "../controllers/cliente-control";
import BarbeiroController from "../controllers/barbeiro-control";
import { usuarioAuth } from '../middlewares/auth-guard';
import Validator from '../middlewares/validator-middleware';

class AuthRouter {

    constructor() {
        this.router = Router();
        this.clienteController = new ClienteController();
        this.barbeiroController = new BarbeiroController();
        this.usuarioAuth = usuarioAuth;
        this.validator = Validator;
        this.loadRoutes();
    }

    loadRoutes() {
        //this.router.get('/cliente', this.clienteController.buscarTodos.bind(this.clienteController));

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

        this.router.get('/protegidaCli',  
            this.usuarioAuth,
            this.validator,
            (req, res) =>{
                try {
                    return res.json({msg:"Entrou Cliente!"})
                } catch (err) {
                    console.log(err)
                }
            
        })

        this.router.get('/protegidaBarb', (req, res) =>{
            return res.json({msg:"Entrou Barbeiro!"})
        })
    

        

    }
}

export default new AuthRouter().router;