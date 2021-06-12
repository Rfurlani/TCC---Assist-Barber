import { Router } from "express";

class AgendamentoRouter {

    constructor(){
        this.router = Router();
        this.loadRoutes();
    }

    loadRoutes(){

    }

}

export default new AgendamentoRouter().router;